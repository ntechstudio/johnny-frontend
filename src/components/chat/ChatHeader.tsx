const ChatHeader = () => {
  return (
    <header className="bg-gradient-to-r from-brand-purple to-brand-pink text-white p-4 shadow-lg flex items-center gap-3">
      <img
        src="johnny.png"
        alt="Johnny"
        className="w-10 h-10 rounded-full border-2 border-white"
      />
      <div>
        <h1 className="text-lg font-semibold leading-none">Johnny</h1>
        <p className="text-sm opacity-80">Your MDBI Assistant</p>
      </div>
    </header>
  );
};

export default ChatHeader;
