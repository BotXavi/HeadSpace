import os
from docx import Document
import PyPDF2

def parse_file(file_path):
    """
    Parses a file and extracts text based on its type.
    
    Args:
        file_path (str): The path to the file to be parsed.
        
    Returns:
        str: Extracted text from the file.
    """
    ext = os.path.splitext(file_path)[1].lower()
    if ext == '.docx':
        return parse_docx(file_path)
    elif ext == '.pdf':
        return parse_pdf(file_path)
    elif ext == '.txt':
        return parse_txt(file_path)
    else:
        raise ValueError("Unsupported file type: {}".format(ext))
    
def parse_docx(file_path: str) -> list[str]:
    """
    Parses a .docx file and extracts its text.
    
    Args:
        file_path (str): The path to the .docx file.
        
    Returns:
        str: Extracted text from the .docx file.
    """
    doc = Document(file_path)
    text = " ".join([para.text for para in doc.paragraphs])
    return text.split()


def parse_pdf(file_path: str) -> list[str]:
    """Parses a PDF file and extracts its text.
    """
    text = []
    with open(file_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text.append(page.extract_text())
    return " ".join(text).split()

def parse_txt(file_path: str) -> list[str]:
    """Parses a text file and extracts its content.
    
    Args:
        file_path (str): The path to the text file.
        
    Returns:
        list[str]: List of words extracted from the text file.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()
    return text.split()
