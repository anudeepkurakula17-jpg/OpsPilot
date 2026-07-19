import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import "./ChatPanel.css";

function ChatPanel() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendQuestion = async () => {
    if (!question.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await API.post("/chat/", {
        question,
      });

      console.log("Response:", res.data);

      const botMessage = {
        role: "assistant",
        text: res.data.answer || "No answer received.",
        sources: res.data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat Error:", err);

      if (err.response) {
        console.error("Response Data:", err.response.data);
        console.error("Status:", err.response.status);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Failed to get response.",
          sources: [],
        },
      ]);
    } finally {
      setQuestion("");
      setLoading(false);
    }
  };

  return (
    <div className="card chat-card">
      <h3>Ask Questions</h3>

      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-msg" : "bot-msg"}
          >
            <strong>{msg.role === "user" ? "You" : "OpsPilot"}</strong>

            <p>{msg.text}</p>

            {msg.sources && msg.sources.length > 0 && (
              <>
                <small>
                  <b>Sources Used:</b>
                </small>

                <ul>
                  {msg.sources.map((src, i) => (
                    <li key={i}>
                      {src.length > 200
                        ? src.substring(0, 200) + "..."
                        : src}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}

        {loading && (
          <div className="bot-msg">
            <strong>OpsPilot</strong>
            <p>Thinking...</p>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask anything about the uploaded PDFs..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              sendQuestion();
            }
          }}
        />

        <button
          className="primary-btn"
          onClick={sendQuestion}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
