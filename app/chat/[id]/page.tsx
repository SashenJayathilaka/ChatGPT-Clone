"use client";

import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col h-screen overflow-hidden"
    >
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </motion.div>
  );
}

export default ChatPage;
