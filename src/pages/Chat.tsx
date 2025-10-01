import { useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import CourseSelector from "@/components/chat/CourseSelector";
import FileUpload from "@/components/chat/FileUpload";

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
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!selectedCourse) return;

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
      formData.append("course", selectedCourse);
      formData.append("message", content);

      const fileMeta: { name: string; type: string }[] = [];

      selectedFiles.forEach((file) => {
        formData.append("files", file);
        fileMeta.push({ name: file.name, type: file.type });
      });

      formData.append("hasFiles", (!!selectedFiles.length).toString());
      formData.append("fileMeta", JSON.stringify(fileMeta));

      const response = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      let replyText = "Johnny received your message!";
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const data = await response.json();
        if (data.output) replyText = data.output;
        else if (data.response) replyText = data.response;
        else replyText = JSON.stringify(data);
      } else {
        replyText = await response.text();
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Oops! Something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-brand-background flex justify-center">
      <div className="flex flex-col w-full max-w-md h-full bg-white shadow-xl border border-gray-200">
        <ChatHeader />

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-3 border-b bg-white">
            <CourseSelector
              selectedCourse={selectedCourse}
              onSelectCourse={setSelectedCourse}
            />
          </div>

          <ChatMessages messages={messages} />

          <div className="p-3 border-t bg-white space-y-3">
            <FileUpload
              onFilesSelected={setSelectedFiles}
              selectedFiles={selectedFiles}
            />
            <ChatInput
              onSend={handleSendMessage}
              disabled={!selectedCourse || isLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
