from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.upload import router as upload_router
from routes.chat import router as chat_router

app = FastAPI(
    title="OpsPilot API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router, prefix="/upload", tags=["Upload"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])


@app.get("/")
def home():
    return {"message": "OpsPilot Backend Running 🚀"}  
