import { useState, useRef, useEffect } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I'm Johnny, your MDBI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("digital_strategy");
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", content);
      formData.append("course", selectedCourse);

      const fileMeta: { name: string; type: string }[] = [];

      selectedFiles.forEach((file, index) => {
        formData.append(`file${index + 1}`, file, file.name);
        fileMeta.push({ name: file.name, type: file.type });
      });

      formData.append("fileMeta", JSON.stringify(fileMeta));
      formData.append("hasFiles", selectedFiles.length > 0 ? "true" : "false");


      const response = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      let reply = "Johnny received your message!";

      if (contentType?.includes("application/json")) {
        const data = await response.json();
        reply = data.response || data.output || JSON.stringify(data);
      } else {
        reply = await response.text();
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Oops! Something went wrong.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSelectedFiles([]); // ✅ Clear file preview from UI
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        🤖 Johnny – Your MDBI Assistant
      </div>

      <div className="chat-course">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="digital_strategy">Digital Strategy</option>
          <option value="ai_productivity">AI & Productivity</option>
        </select>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.role === "user" ? "user" : "assistant"}`}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div className="message assistant">
            <em>Johnny is typing...</em>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-footer">
        <input
          type="file"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setSelectedFiles(Array.from(e.target.files));
            }
          }}
        />

        {/* ✅ Show selected file names */}
        {selectedFiles.length > 0 && (
          <ul style={{ fontSize: "12px", padding: "4px 0", margin: 0 }}>
            {selectedFiles.map((file, index) => (
              <li key={index}>📎 {file.name}</li>
            ))}
          </ul>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem(
              "message"
            ) as HTMLInputElement;
            if (input && input.value.trim()) {
              handleSendMessage(input.value.trim());
              input.value = "";
            }
          }}
        >
          <input type="text" name="message" placeholder="Ask Johnny anything..." />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
