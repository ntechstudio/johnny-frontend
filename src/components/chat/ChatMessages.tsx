import { type Message } from "@/pages/Chat";

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 bg-brand-background space-y-3">
      {messages.map((msg) => {
        const isUser = msg.role === "user";

        return (
          <div
            key={msg.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] rounded-xl shadow-md text-sm px-5 py-3 whitespace-pre-wrap ${
                isUser
                  ? "bg-brand-purple text-white rounded-br-none"
                  : "bg-white text-brand-purple border border-brand-pink rounded-bl-none"
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
