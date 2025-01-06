import React, { memo, SetStateAction } from "react";

import { motion } from "framer-motion";
import Message from "./Message";
type Props = {
  messages: {
    id: number;
    text?: string;
    sender?: "user" | "ai";
    timestamp?: Date;
  }[];
  setPrompts: React.Dispatch<SetStateAction<{ name: string; value: string }[]>>;
};

const Messages = memo(function Messages({ messages, setPrompts }: Props) {
  return (
    <>
      {messages?.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <Message message={message} setPrompts={setPrompts} />
        </motion.div>
      ))}
    </>
  );
});

export default Messages;
