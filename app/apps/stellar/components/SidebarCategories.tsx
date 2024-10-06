"use client";

import React, { useEffect, useState } from "react";
import { File, Folder, Tree } from "./ui/file-tree";
import { TreeViewElement } from "./ui/file-tree";
import { useAuth } from "@clerk/nextjs";

export default function SidebarCategories() {
  const [elements, setElements] = useState<TreeViewElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    async function fetchSidebarItems() {
      if (!isLoaded || !userId) {
        return;
      }

      try {
        console.log("Fetching sidebar items...");
        const response = await fetch("/api/finder/sidebar");
        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch sidebar items: ${errorData.error || response.statusText}`);
        }

        const data = await response.json();
        setElements(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sidebar items:", error);
        setError((error as Error).message);
        setIsLoading(false);
      }
    }

    fetchSidebarItems();
  }, [isLoaded, userId]);

  const renderTreeItems = (items: TreeViewElement[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <Folder
            element={item.name}
            key={item.id}
            value={item.id} // Add this line
          >
            {renderTreeItems(item.children)}
          </Folder>
        );
      }
      return <File name={item.name} value={item.id} key={item.id} />;
    });
  };

  if (!isLoaded || isLoading) {
    return <div className="p-2">Loading...</div>;
  }

  if (error) {
    return <div className="p-2 text-red-500">{error}</div>;
  }

  return (
    <div className="p-2">
      <Tree
        className="overflow-hidden rounded-md bg-background"
        initialExpandedItems={[]}
        elements={elements}
      >
        {renderTreeItems(elements)}
      </Tree>
    </div>
  );
}