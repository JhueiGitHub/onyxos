// app/apps/stellar/components/FolderView.tsx
import React from "react";
import { useStellarStore } from "../hooks/useStellarStore";
import { FileTree } from "./FileTree";
import ContextMenu from "./ContextMenu";

const FolderView: React.FC = () => {
  const { selectedFolder, folderContents } = useStellarStore();

  if (!selectedFolder) {
    return <div className="flex-1 p-4">No folder selected</div>;
  }

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">{selectedFolder.name}</h2>
      <ContextMenu>
        <FileTree
          elements={folderContents}
          className="bg-background text-foreground"
        />
      </ContextMenu>
    </div>
  );
};

export default FolderView;
