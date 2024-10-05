"use client";

import React from "react";
import { motion } from "framer-motion";

interface SaveIndicatorProps {
  isSaving: boolean;
}

export default function SaveIndicator({ isSaving }: SaveIndicatorProps) {
  return (
    <motion.div
      className="absolute top-2 right-2 w-3 h-3 rounded-full"
      animate={{
        backgroundColor: isSaving ? "#28C840" : "transparent",
      }}
      transition={{ duration: 0.3 }}
    />
  );
}
