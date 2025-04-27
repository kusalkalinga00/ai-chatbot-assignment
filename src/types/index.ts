import { ReactNode } from "react";



export interface QuickActionProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}


export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};