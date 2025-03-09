import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  type: "user" | "bot";
  content: string;
}

// Simple response generator based on keywords
const generateResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("karma")) {
    return "Karma Yoga teaches us that we should perform our duties without attachment to the results. As Lord Krishna says, 'You have the right to work, but never to the fruit of work.'";
  }
  if (lowerQuestion.includes("dharma")) {
    return "Dharma refers to one's sacred duty or moral obligations. In the Gita, Krishna explains that following one's dharma, even imperfectly, is better than following someone else's dharma perfectly.";
  }
  if (lowerQuestion.includes("meditation") || lowerQuestion.includes("meditate")) {
    return "The Gita teaches various forms of meditation, particularly in Chapter 6. It emphasizes the importance of controlling the mind and maintaining steady concentration.";
  }
  if (lowerQuestion.includes("purpose") || lowerQuestion.includes("meaning")) {
    return "The Bhagavad Gita teaches that our ultimate purpose is self-realization and understanding our true nature. We should perform our duties selflessly while maintaining devotion to the Divine.";
  }
  
  return "The Bhagavad Gita teaches us about duty, devotion, and self-realization. Could you please rephrase your question about a specific aspect you'd like to learn more about?";
};

export const GitaChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", content: "Namaste! I'm your Bhagavad Gita guide. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { type: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, { type: "bot", content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="flex flex-col h-[250px] bg-gradient-to-br from-[#fff7e0] to-white border-2 border-[#b8860b] shadow-lg rounded-xl">
      <div className="p-2 bg-[#8b6914] text-white font-semibold rounded-t-lg flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white"></div>
        Gita Guide
      </div>
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full">
          <div className="space-y-3 p-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-xl max-w-[80%] text-sm ${
                    msg.type === "user"
                      ? "bg-[#8b6914] text-white"
                      : "bg-[#fff7e0] text-[#222222] border border-[#d4b760]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <div className="inline-block p-2 rounded-xl bg-[#fff7e0] border border-[#d4b760] text-[#222222]">
                  <div className="flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-[#8b6914] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#8b6914] rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-[#8b6914] rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="p-2 border-t border-[#d4b760] bg-white">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the Gita..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border-[#b8860b] focus:ring-[#b8860b] text-sm h-8"
          />
          <Button 
            onClick={handleSend}
            className="bg-[#8b6914] hover:bg-[#6a500f] text-white transition-colors duration-200 h-8 px-3 text-sm"
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};