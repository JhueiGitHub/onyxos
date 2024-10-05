"use client";

import React from "react";
import { motion } from "framer-motion";
import { Folder, File } from "@prisma/client";
import { ContextMenuWrapper } from "./ContextMenu";
import { FolderComponent } from "./Folder";
import { FileComponent } from "./File";
import { FinderAction } from "@/app/types/finder";

interface MainAreaProps {
  folders: Folder[];
  files: File[];
  selectedItems: string[];
  onCreateFolder: (name: string, x: number, y: number) => void;
  onCreateFile: (name: string, x: number, y: number) => void;
  onMoveFolder: (folderId: string, newPath: string) => void;
  onRenameFolder: (folderId: string, newName: string) => void;
  dispatch: React.Dispatch<FinderAction>;
}

export default function MainArea({
  folders,
  files,
  selectedItems,
  onCreateFolder,
  onCreateFile,
  onMoveFolder,
  onRenameFolder,
  dispatch,
}: MainAreaProps) {
  const handleContextMenu = (event: React.MouseEvent, itemId?: string) => {
    event.preventDefault();
    // Additional context menu logic if needed
  };

  const handleDrop = (event: React.DragEvent, targetId: string) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("text/plain");
    if (draggedId && draggedId !== targetId) {
      const draggedFolder = folders.find((folder) => folder.id === draggedId);
      if (draggedFolder) {
        const targetFolder = folders.find((folder) => folder.id === targetId);
        if (targetFolder) {
          onMoveFolder(draggedId, `${targetFolder.path}/${draggedFolder.name}`);
        }
      }
    }
  };

  return (
    <ContextMenuWrapper onCreateFolder={onCreateFolder} onCreateFile={onCreateFile}>
      <motion.div
        className="flex-grow p-4 overflow-auto grid grid-cols-6 gap-4"
        onContextMenu={handleContextMenu}
        onDrop={(e) => handleDrop(e, "root")}
        onDragOver={(e) => e.preventDefault()}
      >
        {folders.map((folder) => (
          <FolderComponent
            key={folder.id}
            folder={folder}
            isSelected={selectedItems.includes(folder.id)}
            onSelect={() =>
              dispatch({ type: "SELECT_ITEM", payload: folder.id })
            }
            onDeselect={() =>
              dispatch({ type: "DESELECT_ITEM", payload: folder.id })
            }
            onContextMenu={handleContextMenu}
            onDrop={handleDrop}
            onRename={(newName) => onRenameFolder(folder.id, newName)}
          />
        ))}
        {files.map((file) => (
          <FileComponent
            key={file.id}
            file={file}
            isSelected={selectedItems.includes(file.id)}
            onSelect={() => dispatch({ type: "SELECT_ITEM", payload: file.id })}
            onDeselect={() =>
              dispatch({ type: "DESELECT_ITEM", payload: file.id })
            }
            onContextMenu={handleContextMenu}
          />
        ))}
      </motion.div>
    </ContextMenuWrapper>
  );
}
