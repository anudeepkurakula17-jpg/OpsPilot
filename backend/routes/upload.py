from fastapi import APIRouter, UploadFile, File
from typing import List
import os

from services.pdf_loader import extract_text_from_pdf
from services.text_splitter import split_text
from services.vector_store import store_chunks

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/")
async def upload_pdf(files: List[UploadFile] = File(...)):
    uploaded_files = []
    total_chunks = 0

    try:
        for file in files:

            if not file.filename.endswith(".pdf"):
                continue

            file_path = os.path.join(UPLOAD_FOLDER, file.filename)

            with open(file_path, "wb") as buffer:
                buffer.write(await file.read())

            text = extract_text_from_pdf(file_path)

            chunks = split_text(text)

            stored_chunks = store_chunks(chunks, file.filename)

            total_chunks += stored_chunks

            uploaded_files.append({
                "filename": file.filename,
                "characters": len(text),
                "chunks": stored_chunks
            })

        return {
            "success": True,
            "message": "PDFs uploaded and indexed successfully.",
            "uploaded_files": uploaded_files,
            "total_files": len(uploaded_files),
            "total_chunks": total_chunks
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }
    