// app/apps/stellar/hooks/useStellarStore.ts
import create from "zustand";
import { devtools } from "zustand/middleware";
import { Folder, SidebarCategory, Asset } from "@prisma/client";

interface StellarStore {
  sidebarCategories: SidebarCategory[];
  selectedFolder: Folder | null;
  folderContents: (Folder | Asset)[];
  initializeStore: () => Promise<void>;
  setSelectedFolder: (folderId: string) => Promise<void>;
  createFolder: (name: string) => Promise<void>;
  deleteFolder: (folderId: string) => Promise<void>;
  renameFolder: (folderId: string, newName: string) => Promise<void>;
}

export const useStellarStore = create<StellarStore>()(
  devtools(
    (set, get) => ({
      sidebarCategories: [],
      selectedFolder: null,
      folderContents: [],

      initializeStore: async () => {
        const categories = await fetch("/api/stellar/sidebar-categories").then(
          (res) => res.json()
        );
        set({ sidebarCategories: categories });

        if (categories.length > 0 && categories[0].items.length > 0) {
          await get().setSelectedFolder(categories[0].items[0].folder.id);
        }
      },

      setSelectedFolder: async (folderId: string) => {
        const folder = await fetch(`/api/stellar/folders/${folderId}`).then(
          (res) => res.json()
        );
        const contents = await fetch(
          `/api/stellar/folders/${folderId}/assets`
        ).then((res) => res.json());
        set({
          selectedFolder: folder,
          folderContents: [...folder.children, ...contents],
        });
      },

      createFolder: async (name: string) => {
        const { selectedFolder } = get();
        if (!selectedFolder) return;

        const newFolder = await fetch(
          `/api/stellar/folders/${selectedFolder.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, parentId: selectedFolder.id }),
          }
        ).then((res) => res.json());

        set((state) => ({
          folderContents: [...state.folderContents, newFolder],
        }));
      },

      deleteFolder: async (folderId: string) => {
        await fetch(`/api/stellar/folders/${folderId}`, { method: "DELETE" });
        set((state) => ({
          folderContents: state.folderContents.filter(
            (item) => "id" in item && item.id !== folderId
          ),
        }));
      },

      renameFolder: async (folderId: string, newName: string) => {
        const updatedFolder = await fetch(`/api/stellar/folders/${folderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName }),
        }).then((res) => res.json());

        set((state) => ({
          folderContents: state.folderContents.map((item) =>
            "id" in item && item.id === folderId ? updatedFolder : item
          ),
        }));
      },
    }),
    { name: "stellar-store" }
  )
);
