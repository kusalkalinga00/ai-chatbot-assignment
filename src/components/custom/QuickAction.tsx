import React from "react";
import { Button } from "@/components/ui/button";
import { QuickActionProps } from "@/types";

const QuickAction: React.FC<QuickActionProps> = (props) => {
  const { icon, text, onClick } = props;
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1 rounded-full px-3 py-1 h-auto text-xs bg-background/50 border-border/40 hover:bg-background/80 whitespace-nowrap"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Button>
  );
};

export default QuickAction;
