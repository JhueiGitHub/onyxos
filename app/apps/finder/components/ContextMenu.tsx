"use client";

import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

interface ContextMenuProps {
  children: React.ReactNode;
  onCreateFolder: (name: string, x: number, y: number) => void;
  onCreateFile: (name: string, x: number, y: number) => void;
}

export function ContextMenuWrapper({
  children,
  onCreateFolder,
  onCreateFile,
}: ContextMenuProps) {
  const handleCreateFolder = () => {
    const name = prompt("Enter folder name:");
    if (name) {
      // Use pointer events to get the current mouse position
      const event = window.event as PointerEvent;
      onCreateFolder(name, event.clientX, event.clientY);
    }
  };

  const handleCreateFile = () => {
    const name = prompt("Enter file name:");
    if (name) {
      // Use pointer events to get the current mouse position
      const event = window.event as PointerEvent;
      onCreateFile(name, event.clientX, event.clientY);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onSelect={handleCreateFolder}>
          New Folder
        </ContextMenuItem>
        <ContextMenuItem onSelect={handleCreateFile}>New File</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
