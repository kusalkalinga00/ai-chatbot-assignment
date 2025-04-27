"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  
  Calendar,
  Clock,
  Info,
  MapPin,
  MessageCircle,
} from "lucide-react";
import QuickAction from "@/components/custom/QuickAction";
import { Message, useChat } from "@ai-sdk/react";
import MessageComp from "@/components/custom/MessageComp";
import { motion } from "framer-motion";

const ChatView = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    setMessages,
  } = useChat();
  const [chatInitiated, setChatInitiated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const viewport = scrollAreaRef.current?.querySelector(
        '[data-slot="scroll-area-viewport"]'
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  const handleQuickAction = (text: string) => {
    // setInput(text);
    setInput(text);
  };

  const initiateChat = async () => {
    setChatInitiated(true);
    setMessages([
      {
        id: "1",
        content:
          "Hello! I'm your Ashoka hospital assistant. I can help you with appointment scheduling, medical information, facility directions, and more. How can I assist you today?",
        role: "assistant",
      },
    ]);
  };

  if (!chatInitiated) {
    return (
      <Card className="border rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-card/80 h-[70vh] flex items-center justify-center">
        <motion.div
          className="text-center p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-primary to-secondary p-5 rounded-full">
              <MessageCircle className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3">
            Welcome to Ashoka Hospital Assistant
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Ask questions about appointments,channeling services, or medical
            information
          </p>
          <Button
            onClick={initiateChat}
            size="lg"
            className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Start Conversation
          </Button>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="border rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-card/80">
      <div className="flex flex-col h-[70vh]">
        <ScrollArea className="flex-1 p-6 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message: Message, index: number) => (
              <MessageComp
                id={message.id}
                content={message.content}
                role={message.role}
                key={index}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-border/40 bg-card/90">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-thin">
            <QuickAction
              icon={<Calendar className="h-3 w-3" />}
              text="Book an appointment"
              onClick={() =>
                handleQuickAction("I'd like to book an appointment")
              }
            />
            <QuickAction
              icon={<Clock className="h-3 w-3" />}
              text="Visiting hours"
              onClick={() => handleQuickAction("What are the visiting hours?")}
            />
            <QuickAction
              icon={<Info className="h-3 w-3" />}
              text="Services offered"
              onClick={() =>
                handleQuickAction("What services does the hospital offer?")
              }
            />
            <QuickAction
              icon={<MapPin className="h-3 w-3" />}
              text="Directions"
              onClick={() => handleQuickAction("How do I get to the hospital?")}
            />
          </div>
          <section className="">
            <form
              onSubmit={handleSubmit}
              className="flex w-full  mx-auto items-center"
            >
              <Input
                className="flex-1 min-h-[40px]"
                placeholder="Type your question here..."
                type="text"
                value={input}
                onChange={handleInputChange}
              />
              <Button className="ml-2" type="submit">
                Send <Send />
              </Button>
            </form>
          </section>
        </div>
      </div>
    </Card>
  );
};

export default ChatView;
