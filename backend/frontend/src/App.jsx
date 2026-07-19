import "./App.css";
import UploadPanel from "./components/UploadPanel";
import ChatPanel from "./components/ChatPanel";

import {
  FaDatabase,
  FaComments,
  FaBolt,
  FaGithub
} from "react-icons/fa";

function App() {
  return (
    <div className="app">
      {/* Background Glow */}
      <div className="bg-glow glow1"></div>
      <div className="bg-glow glow2"></div>

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>OpsPilot</h2>

        <div className="menu">
          <div className="menu-item active">
            <FaComments />
            <span>Chat</span>
          </div>

          <div className="menu-item">
            <FaDatabase />
            <span>Documents</span>
          </div>

          <div className="menu-item">
            <FaBolt />
            <span>AI Engine</span>
          </div>
        </div>

        <div className="github">
          <FaGithub />
          <span>Powered by Groq + Gemini</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main">

        {/* Hero */}
        <section className="hero">
          <span className="hero-tag">
            AI Powered RAG Assistant
          </span>

          <h1>
            Ask Questions
            <br />
            About Any PDF
          </h1>

          <p>
            Upload one or more PDFs and chat with them using
            Gemini Embeddings, ChromaDB and Groq LLM.
          </p>
        </section>

        {/* Dashboard */}
        <div className="dashboard">

          {/* Left Panel */}
          <div className="left-panel">
            <UploadPanel />
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            <ChatPanel />
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
