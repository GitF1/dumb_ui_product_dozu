import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft, Send, User, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [chatContent, setChatContent] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the chat content from location state
    if (location.state?.content) {
      setChatContent(location.state.content);

      // Add initial welcome message
      setMessages([
        {
          id: "welcome",
          content: t("chatting.welcomeMessage", {
            title: location.state.content.title,
          }),
          sender: "assistant",
          timestamp: new Date(),
        },
      ]);
    } else {
      // If no content is provided, redirect back to home
      navigate("/home");
    }
  }, [location.state, navigate, t]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(
      () => {
        const topics = chatContent.topics || [];
        const sampleQuestions = chatContent.sampleQuestions || [];

        // Generate a response based on the user's message
        let responseContent = "";

        // Simple keyword matching for demo purposes
        const lowerCaseMessage = inputMessage.toLowerCase();

        if (
          lowerCaseMessage.includes("hello") ||
          lowerCaseMessage.includes("hi")
        ) {
          responseContent = t("chatting.greetingResponse");
        } else if (
          lowerCaseMessage.includes("help") ||
          lowerCaseMessage.includes("how")
        ) {
          responseContent = t("chatting.helpResponse");
        } else if (
          lowerCaseMessage.includes("topic") ||
          lowerCaseMessage.includes("learn")
        ) {
          responseContent =
            t("chatting.topicsResponse") +
            "\n\n" +
            topics.map((topic: string) => `- ${topic}`).join("\n");
        } else {
          // Pick a random topic to discuss
          const randomTopic = topics[Math.floor(Math.random() * topics.length)];
          responseContent = t("chatting.randomResponse", {
            topic: randomTopic,
          });
        }

        const assistantMessage: Message = {
          id: Date.now().toString(),
          content: responseContent,
          sender: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    ); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleComplete = () => {
    // Navigate back to home after completing the chat session
    navigate("/home", {
      state: {
        completedStudy: true,
        studyType: "chatting",
        contentTitle: chatContent?.title,
        messagesCount: messages.length - 1, // Subtract the welcome message
      },
    });
  };

  if (!chatContent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t("chatting.loading")}</p>
          <Button onClick={handleBack}>{t("common.back")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 border-gray-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("common.back")}
        </Button>
      </div>

      <Card
        className="w-full max-w-[800px] mx-auto bg-white flex flex-col"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-gray-800">
                {chatContent.title || t("chatting.defaultTitle")}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {chatContent.description || t("chatting.defaultDescription")}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={handleComplete}
              className="text-gray-700 border-gray-300"
            >
              {t("common.finish")}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Avatar
                        className={
                          message.sender === "user"
                            ? "bg-gray-800"
                            : "bg-gray-200"
                        }
                      >
                        {message.sender === "user" ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-gray-700" />
                        )}
                      </Avatar>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${message.sender === "user" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}
                    >
                      <div className="whitespace-pre-line">
                        {message.content}
                      </div>
                      <div
                        className={`text-xs mt-1 ${message.sender === "user" ? "text-gray-300" : "text-gray-500"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="flex-shrink-0 mt-1">
                      <Avatar className="bg-gray-200">
                        <Bot className="h-5 w-5 text-gray-700" />
                      </Avatar>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100 text-gray-800">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="border-t border-gray-200 p-4">
          <div className="flex w-full items-center gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t("chatting.messagePlaceholder")}
              className="flex-grow border-gray-300 focus-visible:ring-gray-500"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === "" || isTyping}
              className="bg-gray-800 hover:bg-gray-900 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPage;
