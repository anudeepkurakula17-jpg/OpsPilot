from services.vector_store import collection
from services.embeddings import get_embedding_model

embedding_model = get_embedding_model()


def retrieve_chunks(query, top_k=5):
    query_embedding = embedding_model.embed_query(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        include=["documents", "metadatas"]
    )

    if not results["documents"] or len(results["documents"][0]) == 0:
        return []

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    chunks = []

    for doc, meta in zip(documents, metadatas):
        chunks.append({
            "text": doc,
            "source": meta["source"]
        })

    return chunks    
