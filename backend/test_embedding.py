from services.embeddings import get_embedding_model

embedding = get_embedding_model()

vector = embedding.embed_query("Hello OpsPilot")

print("Embedding generated successfully!")
print("Vector length:", len(vector))
print("First 5 values:", vector[:5]) 