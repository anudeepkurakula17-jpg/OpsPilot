import chromadb
from services.embeddings import get_embedding_model

client = chromadb.PersistentClient(path="database/chroma_db")

collection = client.get_or_create_collection(
    name="opspilot_docs"
)


def store_chunks(chunks, filename):
    embedding_model = get_embedding_model()

    for i, chunk in enumerate(chunks):
        embedding = embedding_model.embed_query(chunk)

        collection.add(
            ids=[f"{filename}_{i}"],
            documents=[chunk],
            embeddings=[embedding],
            metadatas=[{"source": filename}]
        )

    return len(chunks)

