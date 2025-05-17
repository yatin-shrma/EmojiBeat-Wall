"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface PartyCodeDisplayProps {
  partyCode: string;
  defaultMessage?: string;
}

export default function PartyCodeDisplay({ 
  partyCode, 
  defaultMessage = "Share this code with your guests!" 
}: PartyCodeDisplayProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(partyCode).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: `Party code ${partyCode} is now in your clipboard.`,
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    }).catch(err => {
      console.error("Failed to copy: ", err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy the code to clipboard.",
      });
    });
  };

  return (
    <div className="mt-2">
      <p className="text-sm text-primary-foreground/80 mb-1">{defaultMessage}</p>
      <div className="flex items-center space-x-2">
        <Input 
          readOnly 
          value={partyCode} 
          className="text-xl font-mono tracking-widest bg-card/20 text-primary-foreground border-primary-foreground/30 focus-visible:ring-accent"
        />
        <Button variant="outline" size="icon" onClick={handleCopy} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-accent">
          {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
          <span className="sr-only">Copy party code</span>
        </Button>
      </div>
    </div>
  );
}
