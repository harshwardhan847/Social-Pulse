import React, { memo, SetStateAction } from "react";

import { BotIcon, UserIcon } from "lucide-react";

import AIResponseRenderer from "@/components/AiResponseRenderer";

type Props = {
  message: {
    id: number;
    text?: string;
    sender?: "user" | "ai";
    timestamp?: Date;
  };

  setPrompts: React.Dispatch<SetStateAction<{ name: string; value: string }[]>>;
};

const Message = memo(function Message({ message, setPrompts }: Props) {
  return (
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
        <div className="bg-primary p-3 rounded-lg">{message.text}</div>
      )}
    </div>
  );
});

export default Message;
