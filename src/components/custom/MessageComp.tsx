"use client";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { User, Bot, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Message } from "@ai-sdk/react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const MessageComp: React.FC<Message> = (props) => {
  const { content, role } = props;
  const isUser = role === "user";

  return (
    <motion.div
      className={cn("flex items-start gap-3", isUser ? "flex-row-reverse" : "")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar
        className={cn(
          "h-9 w-9 ring-2 shadow-md flex justify-around items-center",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/80 ring-primary/20"
            : "bg-gradient-to-br from-secondary to-secondary/80 ring-secondary/20"
        )}
      >
        {isUser ? (
          <User className="h-6 w-6 text-primary-foreground" />
        ) : (
          <Bot className="h-6 w-6 text-secondary-foreground" />
        )}
      </Avatar>

      <div
        className={cn(
          "rounded-2xl px-4 py-3 max-w-[80%] shadow-sm",
          isUser
            ? "bg-black"
            : "bg-gradient-to-br from-card to-muted/50 text-card-foreground border border-border/40 "
        )}
      >
        {/* <div className="text-sm leading-relaxed">{content}</div> */}

        {!content ? (
          <Loader2 className="animate-spin h-4 w-4 text-muted-foreground" />
        ) : (
          <MarkdownPreview
            source={content}
            style={{
              padding: "0.5rem",
              fontSize: "0.875rem",
              backgroundColor: "transparent",
              maxWidth: "600px",
              width: "100%",
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default MessageComp;
