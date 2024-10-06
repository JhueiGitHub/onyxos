// app/apps/stellar/components/ContextMenu.tsx
import React from "react";
import { ContextMenu as UIContextMenu } from "@/components/ui/context-menu";
import { useStellarStore } from "../hooks/useStellarStore";

interface ContextMenuProps {
  children: React.ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children }) => {
  const { createFolder, deleteFolder, renameFolder } = useStellarStore();

  return (
    <UIContextMenu
      items={[
        {
          label: "New Folder",
          onClick: () => createFolder("New Folder"),
        },
        {
          label: "Rename",
          onClick: (data) => renameFolder(data.id, "New Name"),
        },
        {
          label: "Delete",
          onClick: (data) => deleteFolder(data.id),
        },
      ]}
    >
      {children}
    </UIContextMenu>
  );
};

export default ContextMenu;
