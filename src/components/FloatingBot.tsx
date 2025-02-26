
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Power } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FloatingBotProps {
  isActive: boolean;
  onToggle: () => void;
  onClick: () => void;
}

const FloatingBot: React.FC<FloatingBotProps> = ({ isActive, onToggle, onClick }) => {
  const { toast } = useToast();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
    toast({
      title: isActive ? "SecureBot Deactivated" : "SecureBot Activated",
      description: isActive ? "Bot is now offline" : "Bot is now online and ready",
    });
  };

  return (
    <div className="floating-bot flex flex-col items-end gap-2">
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full p-2 transition-all duration-300 hover:scale-110 ${
          isActive
            ? "bg-cyber-primary text-cyber-dark cyber-border animate-glow"
            : "bg-cyber-dark/80 text-cyber-light border-cyber-primary/50"
        }`}
        onClick={handleToggle}
      >
        <Power className="h-6 w-6" />
      </Button>
      
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
