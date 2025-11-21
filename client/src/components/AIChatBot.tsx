import React, { useState, useEffect, useRef } from 'react';
// Assuming you are using lucide-react or similar for icons
import { Bot, User, X, Send, Lightbulb } from 'lucide-react'; 
// Assuming you have these components from Shadcn/UI
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

// This interface is now defined on the backend, 
// but it's good practice to have it on the frontend too.
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatbotProps {
  onClose: () => void;
}

// Define the API base URL
const API_URL = 'http://localhost:3000/api'; // Change this to your backend URL

const AIChatbot = ({ onClose }: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For loading history
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- NEW: Fetch chat history on component mount ---
  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/chat/history`);
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
        // Add a friendly error message
        setMessages([
          {
            id: 'error-1',
            text: 'Sorry, I couldn t load our past conversation. Let\'s start fresh!',
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 

  // --- UPDATED: handleSendMessage now calls the backend API ---
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(), // Temporary ID, backend will create its own
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    // Optimistic update: Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const botResponse: Message = await response.json();
      
      // Add the bot's response from the API
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Failed to send message:", error);
      // Add a bot error message
      setMessages(prev => [...prev, {
        id: 'error-2',
        text: 'Sorry, I seem to be having trouble connecting. Please try again in a moment.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Mango harvesting tips", icon: "🥭" },
    { text: "Tomato storage advice", icon: "🍅" },
    { text: "Orange transport guide", icon: "🍊" },
    { text: "Reduce losses", icon: "📉" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-green-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-lg">AI Farm Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-green-700">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* --- NEW: Loading state for history --- */}
            {isLoading && (
              <div className="flex justify-center items-center h-full">
                <div className="text-gray-500">Loading conversation...</div>
              </div>
            )}

            {!isLoading && messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    {message.sender === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <div className="text-sm">{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="text-sm text-gray-600">AI is typing...</div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t bg-gray-50">
            <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Quick actions:
            </div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-green-100 text-xs"
                  onClick={() => setInputValue(action.text)}
                >
                  {action.icon} {action.text}
                </Badge>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about post-harvest practices..."
                className="flex-1"
                disabled={isTyping || isLoading} // Disable input while loading/typing
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-green-600 hover:bg-green-700" disabled={isTyping || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatbot;