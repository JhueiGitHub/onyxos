"use client";

import React from "react";
import { motion } from "framer-motion";
import { File } from "@prisma/client";
import Image from "next/image";

interface FileProps {
  file: File;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onContextMenu: (event: React.MouseEvent, itemId: string) => void;
}

export function FileComponent({
  file,
  isSelected,
  onSelect,
  onDeselect,
  onContextMenu,
}: FileProps) {
  const handleClick = () => {
    if (isSelected) {
      onDeselect();
    } else {
      onSelect();
    }
  };

  return (
    <motion.div
      className={`p-2 rounded-md cursor-pointer ${
        isSelected ? "bg-blue-100 dark:bg-blue-900" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onContextMenu={(e) => onContextMenu(e, file.id)}
    >
      <div className="flex flex-col items-center">
        <Image src="/icns/finder/file.png" alt="File" width={48} height={48} />
        <span className="mt-1 text-sm text-center">{file.name}</span>
      </div>
    </motion.div>
  );
}
