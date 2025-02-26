
import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, FileUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  file?: File;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm SecureBot, your cybersecurity assistant. I can help you with cybersecurity questions and analyze files for potential threats. How can I assist you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const getBotResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // Basic conversation patterns
    const responses: { [key: string]: string } = {
      "hi": "Hello! How can I help you today?",
      "hello": "Hi there! What can I do for you?",
      "hey": "Hey! How can I assist you?",
      "what are you": "I'm SecureBot, an AI-powered cybersecurity assistant. I can help you with security-related questions and analyze files for potential threats.",
      "what can you do": "I can help you with:\n- Answering cybersecurity questions\n- Analyzing files for potential threats\n- Providing security recommendations\n- Explaining security concepts\nJust ask me anything!",
      "help": "I can assist you with cybersecurity questions, file analysis, and security recommendations. What specific help do you need?",
    };

    // Check for exact matches
    for (const [key, response] of Object.entries(responses)) {
      if (normalizedMessage === key) {
        return response;
      }
    }

    // Check for partial matches
    if (normalizedMessage.includes("who are you") || normalizedMessage.includes("what are you")) {
      return responses["what are you"];
    }
    if (normalizedMessage.includes("can you do") || normalizedMessage.includes("your capabilities")) {
      return responses["what can you do"];
    }

    // Default response
    return "I understand you're asking about " + userMessage + ". Could you please provide more details about your question? I'm here to help with cybersecurity-related queries and file analysis.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };
    
    setMessages([...messages, newMessage]);
    setInput("");
    
    // Generate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(input),
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload only text, PDF, Word, or image files",
        variant: "destructive",
      });
      return;
    }

    // Add file message
    const newMessage = {
      id: messages.length + 1,
      text: `Uploaded file: ${file.name}`,
      isBot: false,
      file: file,
    };

    setMessages([...messages, newMessage]);

    // Bot response for file upload
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `I've received your file "${file.name}". I'll analyze it for potential security concerns. (This is a placeholder response - actual file analysis would be implemented with backend integration)`,
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
                <p className="cyber-text text-sm whitespace-pre-line">{message.text}</p>
                {message.file && (
                  <div className="mt-2 text-xs text-cyber-primary/70">
                    📎 {message.file.name} ({(message.file.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-cyber-primary">
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <Button
            variant="outline"
            size="icon"
            className="text-cyber-primary hover:text-cyber-accent"
            onClick={() => fileInputRef.current?.click()}
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
