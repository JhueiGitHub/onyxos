"use client";

import React from "react";
import { File, Folder, Tree } from "./ui/file-tree";

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "Favorites",
    children: [
      { id: "2", isSelectable: true, name: "Desktop" },
      { id: "3", isSelectable: true, name: "Documents" },
      { id: "4", isSelectable: true, name: "Downloads" },
    ],
  },
  {
    id: "5",
    isSelectable: true,
    name: "iCloud",
    children: [{ id: "6", isSelectable: true, name: "iCloud Drive" }],
  },
];

export default function SidebarCategories() {
  return (
    <div className="p-2">
      <Tree
        className="overflow-hidden rounded-md bg-background"
        initialExpandedItems={["1", "5"]}
        elements={ELEMENTS}
      >
        <Folder element="Favorites" value="1">
          <File value="2">
            <p>Desktop</p>
          </File>
          <File value="3">
            <p>Documents</p>
          </File>
          <File value="4">
            <p>Downloads</p>
          </File>
        </Folder>
        <Folder element="iCloud" value="5">
          <File value="6">
            <p>iCloud Drive</p>
          </File>
        </Folder>
      </Tree>
    </div>
  );
}
