
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface FloatingBotProps {
  isActive: boolean;
  onClick: () => void;
}

const FloatingBot: React.FC<FloatingBotProps> = ({ isActive, onClick }) => {
  return (
    <div className="floating-bot">
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full p-3 transition-all duration-300 hover:scale-110 ${
          isActive
            ? "bg-cyber-dark/80 text-cyber-primary cyber-border animate-float"
            : "opacity-50 pointer-events-none"
        }`}
        onClick={onClick}
        disabled={!isActive}
      >
        <Bot className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default FloatingBot;
