"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      className="bg-gray-100 dark:bg-gray-800 h-full"
      initial={{ width: 240 }}
      animate={{ width: isOpen ? 240 : 40 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 dark:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
      {isOpen && children}
    </motion.div>
  );
}
