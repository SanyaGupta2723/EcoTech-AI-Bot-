import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, ChevronRight, Loader2 } from 'lucide-react'; // Added Loader2 import
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// Only import SyntaxHighlighter and theme if you actually use code blocks in bot responses
// If not, you can remove these two imports and the 'code' component in renderMessageContent
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Define the Message interface
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  category?: string; // Optional category for future use
}

const ChatInterface: React.FC = () => {
  // State to manage chat messages
  const [messages, setMessages] = useState<Message[]>(() => {
    // Attempt to load messages from localStorage when the component initializes
    try {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        const parsedMessages: Message[] = JSON.parse(savedMessages);
        // Ensure timestamp is a Date object
        return parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage:", error);
      // Fallback to default message if loading fails
    }
    // Default initial message if no saved messages or loading fails
    return [
      {
        id: '1',
        type: 'bot',
        content: "Hello! I'm your Green Tech & Sustainability Advisor. I can help you make environmentally conscious technology choices, reduce your digital carbon footprint, and find sustainable alternatives. What would you like to know about?",
        timestamp: new Date(),
      }
    ];
  });

  // State for the user's input message
  const [inputMessage, setInputMessage] = useState('');
  // State to indicate if the bot is typing (for loading animation)
  const [isTyping, setIsTyping] = useState(false);
  // Ref for auto-scrolling to the latest message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined suggestions for user queries
  const suggestions = [
    "What are the most energy efficient laptops?",
    "How can I reduce my digital carbon footprint?",
    "Best sustainable smartphone brands?",
    "Tell me about e-waste recycling.",
    "What is green computing?"
  ];

  // Effect to scroll to the bottom of the chat when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Effect to save messages to localStorage whenever the messages state changes
  useEffect(() => {
    try {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to localStorage:", error);
    }
  }, [messages]);

  // Helper function to render message content using ReactMarkdown
  const renderMessageContent = (content: string) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Plugin for GitHub Flavored Markdown (tables, task lists, etc.)
        components={{
          // --- BEGIN ALIGNMENT-RELATED CHANGES ---
          // Custom rendering for paragraph tags
          p: ({ node, ...props }) => <p className="mb-1 text-base leading-relaxed break-words" {...props} />,
          // Custom rendering for unordered lists
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-1 space-y-0.5 text-base leading-relaxed break-words pl-4" {...props} />, // Added pl-4 for indentation, adjusted space-y
          // Custom rendering for ordered lists
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-1 space-y-0.5 text-base leading-relaxed break-words pl-4" {...props} />, // Added pl-4 for indentation, adjusted space-y
          // Custom rendering for list items to ensure proper wrapping and alignment
          li: ({ node, ...props }) => <li className="mb-0.5 text-base break-words whitespace-normal" {...props} />,
          // Custom rendering for strong (bold) tags - Removed whitespace-nowrap here
          strong: ({node, ...props}) => <strong className="font-bold text-gray-900 pr-1" {...props} />, // Keep pr-1 for spacing
          // Custom rendering for emphasis (italic) tags
          em: ({node, ...props}) => <em className="italic text-gray-700" {...props} />,
          // Custom rendering for h1 tags
          h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-gray-900" {...props} />,
          // Custom rendering for h2 tags
          h2: ({node, ...props}) => <h2 className="text-lg font-semibold mt-3 mb-1 text-gray-800" {...props} />,
          // Custom rendering for anchor (link) tags
          a: ({node, ...props}) => <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
          // Custom rendering for code blocks and inline code (if you use them)
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={coldarkDark} // Example theme
                language={match[1]}
                PreTag="div"
                {...props}
                className="rounded-md my-2 overflow-auto" // Added overflow-auto for horizontal scroll on long lines
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          // Custom rendering for blockquotes
          blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 my-4 bg-emerald-50 text-gray-700 italic" {...props} />,
          // Custom rendering for tables
          table: ({ node, ...props }: any) => <table className="min-w-full divide-y divide-gray-200 border border-gray-200 my-4" {...props} />,
          thead: ({ node, ...props }: any) => <thead className="bg-gray-50" {...props} />,
          th: ({ node, ...props }: any) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200" {...props} />,
          tbody: ({ node, ...props }: any) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
          tr: ({ node, ...props }: any) => <tr {...props} />,
          td: ({ node, ...props }: any) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-200" {...props} />,
          // --- END ALIGNMENT-RELATED CHANGES ---
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  // Helper function to add emojis to bot responses (no changes here)
  const addEmojisToResponse = (text: string): string => {
    let newText = text;

    // Add environment/nature emojis
    if (newText.toLowerCase().includes('green') || newText.toLowerCase().includes('eco') || newText.toLowerCase().includes('environment')) {
      newText += ' 🌳♻️';
    }
    if (newText.toLowerCase().includes('sustainability') || newText.toLowerCase().includes('sustainable')) {
      newText += ' 🌱🌍';
    }
    // Add tech related emojis
    if (newText.toLowerCase().includes('tech') || newText.toLowerCase().includes('digital') || newText.toLowerCase().includes('gadget')) {
      newText += ' 💻📱';
    }
    // Add action/solution emojis
    if (newText.toLowerCase().includes('reduce') || newText.toLowerCase().includes('recycle') || newText.toLowerCase().includes('solution')) {
      newText += ' ✅💡';
    }
    // Add general positive/helpful emojis randomly
    if (Math.random() < 0.3) {
      const generalEmojis = ['😊', '👍', '✨', '🌟'];
      newText += ' ' + generalEmojis[Math.floor(Math.random() * generalEmojis.length)];
    }

    return newText.trim();
  };

  // Handler for sending a message (minimal change for Enter key)
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return; // Prevent sending empty messages

    const newMessage: Message = {
      id: Date.now().toString(), // Unique ID for the message
      type: 'user', // Mark as user message
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]); // Add user message to chat history
    setInputMessage(''); // Clear the input field
    setIsTyping(true); // Show typing indicator

    const lowerCaseContent = newMessage.content.toLowerCase().trim();

    // --- GREETING LOGIC --- (no changes here)
    const isGreeting = ['hi', 'hello', 'hey', 'namaste'].some(phrase => lowerCaseContent.startsWith(phrase));
    if (isGreeting) {
      const botResponseContent = addEmojisToResponse("Hello there! How can I assist you today with Green Tech and Sustainability? 😊");
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponseContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      return;
    }

    // === LANGUAGE HANDLING LOGIC === (no changes here)
    if (lowerCaseContent.includes('speak in hindi') || lowerCaseContent.includes('hindi me baat karo') || lowerCaseContent.includes('hindi me bolo')) {
      const botResponseContent = addEmojisToResponse("हाँ, मैं हिंदी में भी आपकी सहायता कर सकता हूँ। कृपया अपना प्रश्न पूछें। 👍");
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponseContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      return;
    }
    // === END LANGUAGE HANDLING LOGIC ===

    try {
      // === AI INTEGRATION START - PROMPT FOR BACKEND === (no changes here)
      const prompt = `You are EcoTech Assistant, a Green Tech & Sustainability Advisor. Your primary role is to provide information and guidance on environmentally conscious technology choices, reducing digital carbon footprint, managing e-waste, and finding sustainable alternatives. Focus on these topics.

      User query: "${newMessage.content}"
      
      Please provide the answer in a concise, point-wise or bulleted list format, staying within your defined expertise. If the query is about your function, clearly state your role as a Green Tech & Sustainability Advisor focused on e-waste and sustainable tech.
      **IMPORTANT**: Use Markdown formatting for bolding (**text**) and italics (*text*) where appropriate to highlight key terms or information. Ensure bullet points are formatted with '* ' (asterisk and space).`;

      const backendApiUrl = 'http://localhost:3000/api/chat'; // Your backend API endpoint

      const response = await fetch(backendApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
      });

      let botResponseContent: string;

      if (!response.ok) {
        let errorData: any;
        try {
          errorData = await response.json(); // Try to parse error message from backend
        } catch (jsonError) {
          console.error("Failed to parse error response from backend as JSON:", jsonError, response);
          errorData = { error: { message: response.statusText } }; // Fallback if not JSON
        }

        console.error("Backend Proxy Error Response:", response.status, errorData); // Log detailed error

        // Handle specific HTTP error codes
        if (response.status === 503) {
          botResponseContent = addEmojisToResponse("The AI service is currently experiencing very high load and is unavailable. Please try again in a few moments. 😔");
        } else if (response.status === 401) {
          botResponseContent = addEmojisToResponse("There's an issue with the AI service authentication. Please contact support if this persists. 🔑❌");
        } else if (response.status === 400) {
          botResponseContent = addEmojisToResponse(`I couldn't process that request due to an internal issue. ${errorData.error?.message || 'Please try rephrasing.'} 😕`);
        } else {
          // Generic error message for other status codes
          botResponseContent = addEmojisToResponse(errorData.error?.message || `An unexpected error occurred: ${response.status} ${response.statusText}. Please try again. 🙏`);
        }

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: botResponseContent,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
        return; // Stop further execution if there's an error
      }

      const result = await response.json();

      // Default fallback message if AI response is not as expected
      botResponseContent = "Sorry, I couldn't get a meaningful response from the AI. This might be a temporary issue or an unexpected response format. Please try again with a different query.";

      // Extract content from Gemini API response structure
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        let rawContent = result.candidates[0].content.parts[0].text;
        botResponseContent = addEmojisToResponse(rawContent);
      } else {
        console.error("Unexpected response structure received from backend proxy or no content from AI:", result);
        botResponseContent = addEmojisToResponse(botResponseContent + " 🤔"); // Add emoji for unexpected response
      }
      // === AI INTEGRATION END ===

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponseContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]); // Add bot's response to chat history
      setIsTyping(false); // Hide typing indicator

    } catch (error) {
      console.error("Error communicating with backend proxy:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: addEmojisToResponse("I'm sorry, I couldn't connect to the service. Please check your internet connection or try again later. 🔌❌"),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  // Handler for clicking on a suggestion button (no changes here)
  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion); // Set the input field to the suggestion
    // Optionally, send the message automatically after a small delay
    setTimeout(() => {
        handleSendMessage();
    }, 100);
  };

  // Handler for the "New Chat" button (no changes here)
  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "Hello! I'm your Green Tech & Sustainability Advisor. I can help you make environmentally conscious technology choices, reduce your digital carbon footprint, and find sustainable alternatives. What would you like to know about?",
        timestamp: new Date(),
      }
    ]);
    setInputMessage(''); // Also clear the input field when starting a new chat
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-emerald-100">
      {/* Chat Header */}
      <div className="p-6 border-b border-emerald-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">EcoTech Assistant</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Online & Ready to Help</span>
            </div>
          </div>
        </div>
        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
        >
          New Chat
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-3
              ${message.type === 'user'
                ? 'max-w-[75%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%]' // Smaller width for user messages
                : 'max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%]' // Larger width for bot messages
              }
              ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}> {/* Reverse order for user messages to put avatar on right */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user'
                  ? 'bg-emerald-100' // User avatar background
                  : 'bg-gradient-to-br from-emerald-500 to-teal-600' // Bot avatar background
              }`}>
                {message.type === 'user' ? (
                  <User className="w-5 h-5 text-emerald-600" /> // User icon
                ) : (
                  <Bot className="w-5 h-5 text-white" /> // Bot icon
                )}
              </div>
              <div className={`px-4 py-2 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-emerald-500 text-white' // User message bubble style
                  : 'bg-gray-50 text-gray-800' // Bot message bubble style
              }`}>
                {renderMessageContent(message.content)}
                <p className="text-xs mt-2 opacity-70 text-right"> {/* Aligned time to right within bubble */}
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Display time */}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              {/* Using a simple loader spinner from lucide-react */}
              <div className="bg-gray-50 px-6 py-4 rounded-2xl flex items-center justify-center"> {/* Added flex, items-center, justify-center for centering loader */}
                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Element to scroll into view */}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-emerald-100">
        {/* Suggestions */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Popular Questions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 3).map((suggestion, index) => ( // Display first 3 suggestions
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-emerald-50 text-emerald-700 px-3 py-2 rounded-full hover:bg-emerald-100 transition-colors flex items-center space-x-1"
              >
                <span>{suggestion}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            // Changed onKeyPress to check for Enter key without Shift
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent default Enter behavior (e.g., new line in textarea)
                handleSendMessage();
              }
            }}
            placeholder="Ask about sustainable tech choices..."
            className="flex-1 px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping} // Disable if input is empty or bot is typing
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;