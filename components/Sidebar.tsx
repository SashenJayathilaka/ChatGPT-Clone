"use client";

import { firestore } from "@/firebase/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";

import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";

type Props = {};

function Sidebar({}: Props) {
  const { data: session } = useSession();
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(firestore, `users/${session?.user?.uid!}/chats`),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat session={session} />
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                key={chat.id}
              >
                <ChatRow id={chat.id} session={session} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {session && (
        <div className="border-t border-white py-4 space-y-4">
          <div className="chatRow items-center justify-start bg-gray-700/50 gap-5">
            <img
              src={session?.user?.image!}
              alt={session.user.name!}
              className="h-6 w-6 rounded-full cursor-pointer hover:opacity-50"
            />
            <p>{session.user.name}</p>
          </div>
          <div
            className="chatRow items-center justify-start bg-gray-700/50 gap-5"
            onClick={() => signOut()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <p>Log out</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
