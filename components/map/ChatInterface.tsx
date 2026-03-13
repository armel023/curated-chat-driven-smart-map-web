import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, Bot, User } from 'lucide-react';
import { Place } from '../../contexts/PlacesContext';
import { PlaceCard } from './PlaceCard';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  places?: Place[];
  timestamp: Date;
}

interface ChatInterfaceProps {
  onSearch: (query: string) => { places: Place[]; response: string };
  onPlaceSelect: (place: Place) => void;
  selectedPlace: Place | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onSearch,
  onPlaceSelect,
  selectedPlace,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your city guide assistant. Ask me to find the best cafés, restaurants, or hidden gems. Try: "Show me the five best coffee places" or "Find a café with canal view near Nyhavn"',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const placeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to selected place card
    if (selectedPlace && placeRefs.current[selectedPlace.id]) {
      placeRefs.current[selectedPlace.id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedPlace]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate processing delay
    setTimeout(() => {
      const { places, response } = onSearch(input);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        places: places.length > 0 ? places : undefined,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm">
      <div className="p-4 border-b bg-secondary/50">
        <h3 className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Chat Assistant
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Ask me about places in natural language
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.places && message.places.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.places.map((place) => (
                      <div
                        key={place.id}
                        ref={(el) => (placeRefs.current[place.id] = el)}
                      >
                        <PlaceCard
                          place={place}
                          isSelected={selectedPlace?.id === place.id}
                          onClick={() => onPlaceSelect(place)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything... (e.g., 'Best coffee near Nyhavn')"
            disabled={isTyping}
            className="flex-1"
          />
          <Button type="submit" disabled={isTyping || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {['Best coffee shops', 'Canal view restaurants', 'Open now'].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => setInput(suggestion)}
              className="text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
