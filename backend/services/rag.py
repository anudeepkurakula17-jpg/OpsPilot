from services.retriever import retrieve_chunks
from services.llm import generate_answer
from services.memory import add_message, get_history


def ask_question(question):
    chunks = retrieve_chunks(question)

    if not chunks:
        return {
            "question": question,
            "answer": "No relevant information found in the uploaded documents.",
            "sources": []
        }

    context = "\n\n".join(chunk["text"] for chunk in chunks)

    history = get_history()

    history_text = ""

    for chat in history:
        history_text += f"{chat['role']}: {chat['message']}\n"

    answer = generate_answer(
        context=context,
        question=question,
        history=history_text
    )

    add_message("User", question)
    add_message("Assistant", answer)

    return {
        "question": question,
        "answer": answer,
        "sources": list(set(chunk["source"] for chunk in chunks))
    }

