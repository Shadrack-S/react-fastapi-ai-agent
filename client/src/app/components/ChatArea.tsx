import { useState, useRef, useEffect } from "react";
import { Send, Menu, Bot, User } from "lucide-react";
import { useApp } from "../contexts/AppContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatAreaProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm your AI assistant. How can I help you today?",
    sender: "ai",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export const ChatArea = ({ isSidebarOpen, onToggleSidebar }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: String(Date.now()),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: String(Date.now() + 1),
        text: "I understand your question. As an AI assistant, I'm here to help you with various tasks. Could you provide more details so I can assist you better?",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border bg-card lg:hidden">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-accent rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-foreground">AI Chat</h2>
          <div className="w-10" />
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-foreground mb-4">Start a New Conversation</h2>
            <p className="text-muted-foreground mb-8">
              Ask me anything! I can help you with coding, writing, analysis, and much more.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="p-4 bg-card border border-border rounded-xl hover:bg-accent transition-all text-left">
                <p className="text-foreground">💡 Explain a concept</p>
                <p className="text-muted-foreground">Break down complex topics</p>
              </button>
              <button className="p-4 bg-card border border-border rounded-xl hover:bg-accent transition-all text-left">
                <p className="text-foreground">✍️ Write content</p>
                <p className="text-muted-foreground">Generate text & ideas</p>
              </button>
              <button className="p-4 bg-card border border-border rounded-xl hover:bg-accent transition-all text-left">
                <p className="text-foreground">🔍 Analyze data</p>
                <p className="text-muted-foreground">Get insights & patterns</p>
              </button>
              <button className="p-4 bg-card border border-border rounded-xl hover:bg-accent transition-all text-left">
                <p className="text-foreground">🛠️ Debug code</p>
                <p className="text-muted-foreground">Fix bugs & optimize</p>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-card">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-4 pr-12 bg-input-background dark:bg-input rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-foreground transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border bg-card lg:hidden">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-accent rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-foreground">AI Chat</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-background">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "ai"
                    ? "bg-gradient-to-br from-indigo-600 to-purple-600"
                    : "bg-accent"
                }`}
              >
                {message.sender === "ai" ? (
                  <Bot className="w-6 h-6 text-white" />
                ) : user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <User className="w-6 h-6 text-muted-foreground" />
                )}
              </div>

              <div
                className={`flex-1 max-w-[80%] ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                <p className="text-muted-foreground mt-1 px-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-card border border-border px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-border bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-4 pr-12 bg-input-background dark:bg-input rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-foreground transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
