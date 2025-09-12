#!/usr/bin/env python3
"""
Script to generate and run backend tests
"""
import subprocess
import sys
import os
from pathlib import Path

def run_command(cmd, cwd=None, description=""):
    """Run a command and handle errors"""
    print(f"\n{'='*50}")
    print(f"Running: {description or ' '.join(cmd)}")
    print(f"{'='*50}")
    
    try:
        result = subprocess.run(cmd, cwd=cwd, check=True, capture_output=False)
        print(f"Success: {description}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Failed: {description}")
        print(f"Exit code: {e.returncode}")
        return False
    except FileNotFoundError:
        print(f"Command not found: {cmd[0]}")
        return False

def main():
    root_dir = Path(__file__).parent
    
    print("Starting backend test generation and execution")
    
    # Step 1: Generate backend tests
    print("\n1. Generating backend tests...")
    if not run_command([
        sys.executable, "test_generator.py", ".", "tests"
    ], cwd=root_dir, description="Generate backend tests"):
        print("Failed to generate backend tests")
        return False
    
    # Step 2: Install backend test dependencies
    print("\n2. Installing backend test dependencies...")
    run_command([
        "uv", "add", "pytest", "pytest-cov", "--dev"
    ], cwd=root_dir, description="Install backend test dependencies")
    
    # Step 3: Run backend tests
    print("\n3. Running backend tests...")
    backend_success = run_command([
        "uv", "run", "pytest", "tests/", "-v", "--tb=short"
    ], cwd=root_dir, description="Run backend tests")
    
    # Summary
    print("\n" + "="*60)
    print("TEST EXECUTION SUMMARY")
    print("="*60)
    print(f"Backend tests: {'PASSED' if backend_success else 'FAILED'}")
    
    if backend_success:
        print("\nAll backend tests completed successfully!")
        return True
    else:
        print("\nBackend tests failed. Check the output above for details.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)