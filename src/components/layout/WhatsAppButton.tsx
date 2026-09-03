"use client";

import { WHATSAPP_NUMBER } from "@/lib/constant";
import { motion } from "framer-motion";



export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-paper-50 shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M16 2.9C8.8 2.9 2.9 8.7 2.9 16c0 2.5.7 4.9 1.9 7L3 29l6.2-1.6c2 1.1 4.3 1.7 6.8 1.7 7.2 0 13.1-5.8 13.1-13.1S23.2 2.9 16 2.9zm0 24c-2.2 0-4.3-.6-6.1-1.7l-.4-.3-3.7 1 1-3.6-.3-.4a10.7 10.7 0 0 1-1.7-5.9c0-6 4.9-10.9 10.9-10.9S26.9 10 26.9 16 22 26.9 16 26.9zm6-8.2c-.3-.2-1.9-1-2.2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3 2 3 4.7 4.2c2.8 1.2 2.8.8 3.3.7.5 0 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4z" />
      </svg>
    </motion.a>
  );
}