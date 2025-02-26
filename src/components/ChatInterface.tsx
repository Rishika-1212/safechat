
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, FileUp } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm SecureBot, your cybersecurity assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };
    
    setMessages([...messages, newMessage]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "I'm processing your request. This is a placeholder response for now.",
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="chat-container cyber-panel animate-slide-up">
      <div className="flex items-center justify-between p-4 border-b border-cyber-primary">
        <h2 className="text-lg font-bold cyber-text text-cyber-primary">SecureBot Sentinel</h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-cyber-primary hover:text-cyber-accent"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-[350px] p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? "bg-cyber-dark/90 text-cyber-light border border-cyber-primary"
                    : "bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/50"
                }`}
              >
                <p className="cyber-text text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-cyber-primary">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="text-cyber-primary hover:text-cyber-accent"
          >
            <FileUp className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="cyber-text bg-cyber-dark/50 border-cyber-primary/50 focus:border-cyber-primary"
          />
          <Button
            onClick={handleSend}
            className="bg-cyber-primary text-cyber-dark hover:bg-cyber-accent"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
