// app/apps/stellar/components/Sidebar.tsx
import React from "react";
import { useStellarStore } from "../hooks/useStellarStore";
import { Sidebar as AceternitySidebar } from "./ui/sidebar";

const Sidebar: React.FC = () => {
  const { sidebarCategories, selectedFolder, setSelectedFolder } =
    useStellarStore();

  return (
    <AceternitySidebar
      className="w-64 bg-secondary"
      items={sidebarCategories.map((category) => ({
        title: category.name,
        items: category.items.map((item) => ({
          title: item.folder.name,
          onClick: () => setSelectedFolder(item.folder.id),
          active: selectedFolder?.id === item.folder.id,
        })),
      }))}
    />
  );
};

export default Sidebar;
