"use client";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotIcon, Send, UserIcon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import AIResponseRenderer from "@/components/AiResponseRenderer";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";

interface Message {
  id: number;
  text?: string;
  sender?: "user" | "ai";
  timestamp?: Date;
}

const initialPrompts = [
  {
    name: "Generate Report",
    value: "Generate a Social Media report from my data.",
  },
  {
    name: "Generate Insights",
    value: "Generate insights from my data.",
  },
  {
    name: "Generate Post Recommendations",
    value: "Generate post recommendations from my data.",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [prompts, setPrompts] = useState<{ name: string; value: string }[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    if (messages.length > 0) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
    if (messages.length === 0) {
      setPrompts(initialPrompts);
    }
  }, [messages]);
  useEffect(() => {
    scrollToBottom();
  }, [user]);

  if (!user) {
    return (
      <div className="w-full h-full flex-1 flex items-center justify-center">
        <div className="w-10 h-10 aspect-square border-r-4 border-t-4 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (inputMessage.trim() === "") return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    console.log(newMessage);

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      if (!data) {
        throw new Error("No data received from the API");
      }

      // Extract the AI's response from the nested structure
      const aiResponseText =
        data?.outputs[0]?.outputs[0]?.outputs?.message?.message?.text;

      const aiResponse: Message = {
        id: Date.now() + 1,
        text: aiResponseText || "Sorry, I couldn't process your request.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, there was an error processing your request.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-0 w-full">
        <div
          className={`w-full flex flex-col relative flex-1 ${
            messages.length !== 0 && "h-full"
          }`}
        >
          <CardContent className="flex-1">
            <ScrollArea className="pr-4">
              <div className="flex-grow overflow-y-auto mb-4 space-y-4 text-white">
                {messages?.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={` p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-transparent max-w-3/4"
                          : "bg-transparent w-full "
                      }`}
                      key={message.id}
                    >
                      <div className="flex items-center mb-1 text-black">
                        {message.sender === "user" ? (
                          <UserIcon className="w-4 h-4 mr-2" />
                        ) : (
                          <BotIcon className="w-4 h-4 mr-2" />
                        )}
                        <span className="text-xs text-black">
                          {new Date(
                            message?.timestamp ?? Date.now().toString()
                          )?.toLocaleTimeString()}
                        </span>
                      </div>
                      {message.sender === "ai" ? (
                        <AIResponseRenderer
                          setPrompts={setPrompts}
                          message={message?.text ?? ""}
                        />
                      ) : (
                        <div className="bg-primary p-3 rounded-lg">
                          {message.text}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-blue-700 p-3 rounded-lg">
                      <p>AI is typing...</p>
                    </div>
                  </div>
                )}
              </div>

              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter
            className={`sticky bottom-0 left-0 flex flex-col right-0 pt-4 ${
              messages.length > 0
                ? "bg-gradient-to-t from-white via-white to-transparent"
                : ""
            } `}
          >
            <div className="md:max-w-3xl mx-auto">
              {messages.length == 0 && (
                <CardHeader className="self-start -mx-4">
                  <CardTitle className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-black via-primary to-primary">
                    Hi there, {user?.firstName}
                    <br /> What would like to know?
                  </CardTitle>
                </CardHeader>
              )}

              <motion.form
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  handleSendMessage(e);
                }}
                className="flex gap-4 flex-wrap w-full"
              >
                {prompts?.map((prompt) => (
                  <Button
                    key={prompt?.name}
                    variant={"outline"}
                    onClick={() => {
                      setInputMessage(prompt?.value);
                    }}
                    className="flex-shrink-0 w-min rounded-full outline-primary border-primary hover:bg-white hover:text-foreground bg-white/90 hover:shadow-[0px_0px_8px_0px_rgba(255,_44,_107,_0.77)] shadow-sm transition-shadow ease-in-out duration-300"
                  >
                    {prompt?.name}
                  </Button>
                ))}
                <div
                  onClick={() => inputRef.current?.focus()}
                  className={`flex w-full bg-white/90 shadow-sm rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-neutral-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus:ring-2 ${
                    messages?.length === 0 ? "flex-col" : ""
                  }`}
                >
                  <Textarea
                    rows={1}
                    maxLength={200}
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message here..."
                    className="border-0 ring-0 resize-none min-h-10 h-10 scroll-smooth shadow-none focus:ring-0 focus-within:ring-0 focus-visible:ring-0 focus-within:border-0 focus:border-0 focus-within:ring-offset-0 focus-within:ring-transparent focus:ring-transparent rounded-none focus-visible:ring-transparent"
                  />
                  <div className="flex items-center justify-end">
                    <Button
                      type="submit"
                      variant={"default"}
                      className="rounded-full aspect-square h-10 w-10 p-1"
                      disabled={isTyping}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.form>
            </div>
          </CardFooter>
        </div>
      </div>
    </>
  );
}
