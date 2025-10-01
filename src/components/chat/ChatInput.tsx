import { useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const ChatInput = ({
  onSend,
  disabled,
  isLoading,
}: {
  onSend: (content: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSend(content);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white p-3 rounded-2xl shadow-md border mt-2"
    >
      <input
        type="text"
        placeholder="Ask Johnny anything..."
        className="flex-1 px-4 py-2 outline-none text-sm placeholder:text-gray-400"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        className="ml-2 bg-brand-purple text-white px-3 py-2 rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
        disabled={disabled || isLoading}
      >
        <PaperPlaneIcon />
      </button>
    </form>
  );
};

export default ChatInput;

