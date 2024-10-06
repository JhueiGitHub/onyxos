// app/apps/stellar/components/StellarLayout.tsx
import React from "react";
import Sidebar from "./Sidebar";
import FolderView from "./FolderView";
import DragDropProvider from "./DragDropProvider";

const StellarLayout: React.FC = () => {
  return (
    <DragDropProvider>
      <div className="flex h-full">
        <Sidebar />
        <FolderView />
      </div>
    </DragDropProvider>
  );
};

export default StellarLayout;
