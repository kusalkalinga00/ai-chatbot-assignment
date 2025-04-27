"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, Calendar, Clock, Info, MapPin } from "lucide-react";
import QuickAction from "@/components/custom/QuickAction";
import { Message, useChat } from "@ai-sdk/react";
import MessageComp from "@/components/custom/MessageComp";

// const INITIAL_MESSAGES: Message[] = [
//   {
//     id: "1",
//     content:
//       "Hello! I'm your hospital assistant. I can help you with appointment scheduling, medical information, facility directions, and more. How can I assist you today?",
//     role: "assistant",
//   },
// ];

const ChatView = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuickAction = (text: string) => {
    // setInput(text);
  };

  return (
    <Card className="border rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-card/80">
      <div className="flex flex-col h-[70vh]">
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
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

          {/* <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-background/50 border-border/40 focus-visible:ring-primary/40"
              disabled={isLoading}
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="rounded-full"
              disabled={isLoading}
            >
              <Mic className="h-4 w-4" />
              <span className="sr-only">Voice input</span>
            </Button>
            <Button
              type="submit"
              size="icon"
              className="rounded-full"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form> */}
        </div>
      </div>
    </Card>
  );
};

export default ChatView;
