from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from doc_parser import parse_file
import os

UPLOAD_DIR = "temp_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    try:
        words = parse_file(file_path)
    except ValueError as e:
        return {"error": str(e)}

    return {"words": words}
