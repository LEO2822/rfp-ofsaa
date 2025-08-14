from docling.document_converter import DocumentConverter

source = "" # add a file or file path to load the document in the markdown output
converter = DocumentConverter()
result = converter.convert(source)
print(result.document.export_to_markdown())