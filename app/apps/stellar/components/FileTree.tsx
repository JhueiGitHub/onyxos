// components/ui/file-tree.tsx
"use client";

import {
  FileTree as MagicUIFileTree,
  File,
  Folder,
} from "./ui/file-tree";

export function FileTree({ folders, onFolderClick }) {
  const renderFolder = (folder) => (
    <Folder
      key={folder.id}
      name={folder.name}
      onClick={() => onFolderClick(folder)}
    >
      {folder.children.map((child) =>
        child.children ? (
          renderFolder(child)
        ) : (
          <File key={child.id} name={child.name} />
        )
      )}
    </Folder>
  );

  return (
    <MagicUIFileTree>
      {folders.map((folder) => renderFolder(folder))}
    </MagicUIFileTree>
  );
}
