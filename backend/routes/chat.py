from fastapi import APIRouter
from pydantic import BaseModel
from services.rag import ask_question

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/")
async def chat(request: ChatRequest):
    result = ask_question(request.question)
    print("CHAT RESULT:", result)
    return result
