"use client";

import React from "react";
import {
  ContextMenu as ShadcnContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

interface ContextMenuProps {
  children: React.ReactNode;
  onCreateFolder: (name: string, x: number, y: number) => void;
}

export function ContextMenu({ children, onCreateFolder }: ContextMenuProps) {
  const handleCreateFolder = (event: React.MouseEvent) => {
    const name = prompt("Enter folder name:");
    if (name) {
      onCreateFolder(name, event.clientX, event.clientY);
    }
  };

  return (
    <ShadcnContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onSelect={handleCreateFolder}>
          New Folder
        </ContextMenuItem>
        <ContextMenuItem>New File</ContextMenuItem>
      </ContextMenuContent>
    </ShadcnContextMenu>
  );
}
