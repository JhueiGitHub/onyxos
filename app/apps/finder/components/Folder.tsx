"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Folder } from "@prisma/client";
import Image from "next/image";

interface FolderProps {
  folder: Folder;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onContextMenu: (event: React.MouseEvent, itemId: string) => void;
  onDrop: (event: React.DragEvent, targetId: string) => void;
}

export function FolderComponent({
  folder,
  isSelected,
  onSelect,
  onDeselect,
  onContextMenu,
  onDrop,
}: FolderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(folder.name);

  const handleClick = () => {
    if (isSelected) {
      onDeselect();
    } else {
      onSelect();
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleNameSubmit = () => {
    setIsEditing(false);
    // Implement folder rename logic
  };

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("text/plain", folder.id);
  };

  return (
    <motion.div
      className={`p-2 rounded-md cursor-pointer ${
        isSelected ? "bg-blue-100 dark:bg-blue-900" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={(e) => onContextMenu(e, folder.id)}
      draggable
      onDragStart={handleDragStart}
      onDrop={(e) => onDrop(e, folder.id)}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/icns/finder/folder.png"
          alt="Folder"
          width={48}
          height={48}
        />
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameSubmit}
            onKeyPress={(e) => e.key === "Enter" && handleNameSubmit()}
            className="mt-1 px-1 w-full text-center bg-transparent border-none focus:outline-none"
            autoFocus
          />
        ) : (
          <span className="mt-1 text-sm text-center">{folder.name}</span>
        )}
      </div>
    </motion.div>
  );
}
