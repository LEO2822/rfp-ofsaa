import os
import ast
import inspect
from pathlib import Path
from typing import Dict, List, Set, Any
import re

class TestGenerator:
    def __init__(self, source_folder: str, output_folder: str = None):
        self.source_folder = Path(source_folder)
        self.output_folder = Path(output_folder) if output_folder else self.source_folder
        self.imports_cache: Dict[str, Set[str]] = {}
        
    def scan_python_files(self) -> List[Path]:
        """Recursively find all Python files in the source folder."""
        python_files = []
        
        # Directories to exclude from scanning
        exclude_dirs = {
            '.venv', 'venv', '__pycache__', '.git', 'node_modules', 
            '.pytest_cache', 'build', 'dist', '.tox', 'env',
            'frontend', 'tests'  # Exclude frontend and existing tests
        }
        
        for file_path in self.source_folder.rglob("*.py"):
            # Skip if file is in excluded directory
            if any(excluded in file_path.parts for excluded in exclude_dirs):
                continue
                
            # Skip test files and __init__.py
            if file_path.name.startswith("test_") or file_path.name == "__init__.py":
                continue
                
            python_files.append(file_path)
        return python_files
    
    def parse_file(self, file_path: Path) -> ast.AST:
        """Parse Python file and return AST."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return ast.parse(content)
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
            return None
    
    def extract_functions_and_classes(self, tree: ast.AST) -> Dict[str, Any]:
        """Extract function and class information from AST."""
        items = {"functions": [], "classes": []}
        
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef) and not node.name.startswith('_'):
                # Extract function info
                func_info = {
                    "name": node.name,
                    "args": [arg.arg for arg in node.args.args],
                    "defaults": len(node.args.defaults),
                    "returns": self.get_return_type_hint(node),
                    "docstring": ast.get_docstring(node),
                    "is_async": isinstance(node, ast.AsyncFunctionDef)
                }
                items["functions"].append(func_info)
            
            elif isinstance(node, ast.ClassDef):
                # Extract class and its methods
                class_info = {
                    "name": node.name,
                    "methods": [],
                    "docstring": ast.get_docstring(node)
                }
                
                for item in node.body:
                    if isinstance(item, ast.FunctionDef) and not item.name.startswith('_'):
                        method_info = {
                            "name": item.name,
                            "args": [arg.arg for arg in item.args.args],
                            "defaults": len(item.args.defaults),
                            "returns": self.get_return_type_hint(item),
                            "docstring": ast.get_docstring(item),
                            "is_async": isinstance(item, ast.AsyncFunctionDef),
                            "is_staticmethod": any(isinstance(d, ast.Name) and d.id == 'staticmethod' 
                                                 for d in item.decorator_list),
                            "is_classmethod": any(isinstance(d, ast.Name) and d.id == 'classmethod' 
                                                for d in item.decorator_list)
                        }
                        class_info["methods"].append(method_info)
                
                items["classes"].append(class_info)
        
        return items
    
    def get_return_type_hint(self, node: ast.FunctionDef) -> str:
        """Extract return type hint if available."""
        if node.returns:
            return ast.unparse(node.returns)
        return None
    
    def generate_test_function(self, func_info: Dict[str, Any], class_name: str = None) -> str:
        """Generate pytest test function for a given function."""
        func_name = func_info["name"]
        args = func_info["args"]
        is_async = func_info.get("is_async", False)
        
        # Remove 'self' or 'cls' from args for methods
        if class_name and args and args[0] in ['self', 'cls']:
            test_args = args[1:]
        else:
            test_args = args
        
        # Generate test function name
        if class_name:
            test_func_name = f"test_{class_name.lower()}_{func_name}"
        else:
            test_func_name = f"test_{func_name}"
        
        # Generate test parameters
        test_params = self.generate_test_parameters(test_args)
        
        # Generate function call
        if class_name:
            if func_info.get("is_staticmethod"):
                func_call = f"{class_name}.{func_name}({', '.join(test_params.keys())})"
            elif func_info.get("is_classmethod"):
                func_call = f"{class_name}.{func_name}({', '.join(test_params.keys())})"
            else:
                func_call = f"instance.{func_name}({', '.join(test_params.keys())})"
        else:
            func_call = f"{func_name}({', '.join(test_params.keys())})"
        
        # Generate test cases
        test_cases = self.generate_test_cases(func_info, test_params, func_call, class_name)
        
        async_prefix = "async " if is_async else ""
        
        test_code = f"""
{async_prefix}def {test_func_name}():
    \"\"\"Test {func_name} function.\"\"\"
{test_cases}
"""
        return test_code
    
    def generate_test_parameters(self, args: List[str]) -> Dict[str, str]:
        """Generate test parameters based on argument names."""
        params = {}
        for arg in args:
            if 'id' in arg.lower():
                params[arg] = "1"
            elif 'name' in arg.lower() or 'str' in arg.lower():
                params[arg] = f'"{arg}_test"'
            elif 'count' in arg.lower() or 'num' in arg.lower() or 'size' in arg.lower():
                params[arg] = "10"
            elif 'list' in arg.lower() or 'items' in arg.lower():
                params[arg] = "[1, 2, 3]"
            elif 'dict' in arg.lower() or 'data' in arg.lower():
                params[arg] = '{"key": "value"}'
            elif 'bool' in arg.lower() or 'flag' in arg.lower():
                params[arg] = "True"
            else:
                params[arg] = f'"{arg}"'
        return params
    
    def generate_test_cases(self, func_info: Dict[str, Any], test_params: Dict[str, str], 
                          func_call: str, class_name: str = None) -> str:
        """Generate test cases with assertions."""
        func_name = func_info["name"]
        is_async = func_info.get("is_async", False)
        await_prefix = "await " if is_async else ""
        
        # Setup for class methods
        setup = ""
        if class_name and not func_info.get("is_staticmethod") and not func_info.get("is_classmethod"):
            setup = f"    instance = {class_name}()\n"
        
        # Basic test case
        basic_test = f"""    # Test basic functionality
{setup}    result = {await_prefix}{func_call}
    assert result is not None"""
        
        # Edge cases based on function name patterns
        edge_cases = []
        
        if any(keyword in func_name.lower() for keyword in ['get', 'find', 'search']):
            if test_params:  # Only add if there are parameters
                first_param = list(test_params.keys())[0]
                edge_cases.append(f"""    # Test with empty/None input
    try:
        result = {await_prefix}{func_call.replace(first_param, 'None')}
        assert result is None or result == []
    except (ValueError, TypeError):
        pass  # Expected for invalid input""")
        
        if any(keyword in func_name.lower() for keyword in ['calculate', 'compute', 'sum']):
            if test_params:  # Only add if there are parameters
                first_param = list(test_params.keys())[0]
                edge_cases.append(f"""    # Test with zero values
    result = {await_prefix}{func_call.replace(first_param, '0')}
    assert isinstance(result, (int, float))""")
        
        if any(keyword in func_name.lower() for keyword in ['validate', 'check', 'is_']):
            edge_cases.append(f"""    # Test validation
    assert isinstance(result, bool)""")
        
        # Return type specific tests
        return_type = func_info.get("returns")
        if return_type:
            if "List" in return_type or "list" in return_type:
                edge_cases.append("    assert isinstance(result, list)")
            elif "Dict" in return_type or "dict" in return_type:
                edge_cases.append("    assert isinstance(result, dict)")
            elif "str" in return_type:
                edge_cases.append("    assert isinstance(result, str)")
            elif "int" in return_type:
                edge_cases.append("    assert isinstance(result, int)")
            elif "bool" in return_type:
                edge_cases.append("    assert isinstance(result, bool)")
        
        all_tests = [basic_test] + edge_cases
        return "\n\n".join(all_tests)
    
    def generate_fixtures(self, classes: List[Dict[str, Any]]) -> str:
        """Generate pytest fixtures for classes."""
        if not classes:
            return ""
        
        fixtures = ["import pytest\n"]
        
        for class_info in classes:
            class_name = class_info["name"]
            fixture_code = f"""
@pytest.fixture
def {class_name.lower()}_instance():
    \"\"\"Fixture for {class_name} instance.\"\"\"
    return {class_name}()
"""
            fixtures.append(fixture_code)
        
        return "\n".join(fixtures)
    
    def generate_test_file(self, file_path: Path) -> str:
        """Generate complete test file for a Python module."""
        tree = self.parse_file(file_path)
        if not tree:
            return ""
        
        items = self.extract_functions_and_classes(tree)
        
        # Get module name for imports
        module_path = file_path.relative_to(self.source_folder)
        module_name = str(module_path).replace('/', '.').replace('\\', '.').replace('.py', '')
        
        # Start building test file content
        test_content = [
            "import pytest",
            f"from {module_name} import *",
            ""
        ]
        
        # Add fixtures for classes
        if items["classes"]:
            test_content.append(self.generate_fixtures(items["classes"]))
        
        # Generate tests for standalone functions
        for func_info in items["functions"]:
            test_content.append(self.generate_test_function(func_info))
        
        # Generate tests for class methods
        for class_info in items["classes"]:
            for method_info in class_info["methods"]:
                test_content.append(self.generate_test_function(method_info, class_info["name"]))
        
        return "\n".join(test_content)
    
    def generate_all_tests(self):
        """Generate test files for all Python modules in the source folder."""
        python_files = self.scan_python_files()
        
        if not python_files:
            print(f"No Python files found in {self.source_folder}")
            return
        
        # Create output directory if it doesn't exist
        self.output_folder.mkdir(parents=True, exist_ok=True)
        
        for file_path in python_files:
            print(f"Generating tests for {file_path}")
            
            # Generate test content
            test_content = self.generate_test_file(file_path)
            
            if test_content.strip():
                # Create test file name
                test_file_name = f"test_{file_path.stem}.py"
                test_file_path = self.output_folder / test_file_name
                
                # Write test file
                with open(test_file_path, 'w', encoding='utf-8') as f:
                    f.write(test_content)
                
                print(f"Generated: {test_file_path}")
            else:
                print(f"No testable functions/classes found in {file_path}")


def main():
    """Main function to run the test generator."""
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python test_generator.py <source_folder> [output_folder]")
        print("Example: python test_generator.py ./src ./tests")
        return
    
    source_folder = sys.argv[1]
    output_folder = sys.argv[2] if len(sys.argv) > 2 else source_folder
    
    generator = TestGenerator(source_folder, output_folder)
    generator.generate_all_tests()
    
    print("\nTest generation completed!")
    print("Run tests with: pytest")


if __name__ == "__main__":
    main()