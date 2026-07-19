import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_answer(context, question, history):
    prompt = f"""
You are OpsPilot, an AI assistant that answers questions only from the uploaded documents.

Conversation History:
{history}

Document Context:
{context}

Current Question:
{question}

Instructions:
- Use the conversation history to understand follow-up questions.
- Answer ONLY using the document context.
- If the answer is not present in the documents, reply:
"I couldn't find that information in the uploaded documents."
- Do not make up information.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content
