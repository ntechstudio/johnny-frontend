import { type Message } from "@/pages/Chat";

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-background">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        return (
          <div
            key={msg.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-xl text-sm shadow-md whitespace-pre-wrap ${
                isUser
                  ? "bg-brand-purple text-white rounded-br-none"
                  : "bg-white border border-brand-pink text-brand-purple rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
