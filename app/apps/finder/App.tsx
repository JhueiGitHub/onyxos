"use client";

import React, { useReducer, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SidebarCategories from "./components/SidebarCategories";
import TopBar from "./components/TopBar";
import MainArea from "./components/MainArea";
import SaveIndicator from "./components/SaveIndicator";
import { FinderState, FinderAction } from "@/app/types/finder";
import { useDebouncedCallback } from "@/hooks/useDebounce";

const initialState: FinderState = {
  currentPath: "/",
  folders: [],
  files: [],
  selectedItems: [],
};

function finderReducer(state: FinderState, action: FinderAction): FinderState {
  switch (action.type) {
    case "SET_PATH":
      return { ...state, currentPath: action.payload };
    case "SET_CONTENTS":
      return {
        ...state,
        folders: action.payload.folders,
        files: action.payload.files,
      };
    case "ADD_FOLDER":
      return { ...state, folders: [...state.folders, action.payload] };
    case "UPDATE_FOLDER":
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === action.payload.id ? action.payload : folder
        ),
      };
    case "SELECT_ITEM":
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    case "DESELECT_ITEM":
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item) => item !== action.payload
        ),
      };
    default:
      return state;
  }
}

export default function FinderApp() {
  const [state, dispatch] = useReducer(finderReducer, initialState);
  const [isSaving, setIsSaving] = useState(false);

  const debouncedSave = useDebouncedCallback(
    async (changes) => {
      setIsSaving(true);
      try {
        switch (changes.type) {
          case "CREATE_FOLDER":
            await fetch("/api/finder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(changes),
            });
            break;
          case "MOVE_FOLDER":
            await fetch("/api/finder", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(changes),
            });
            break;
          case "RENAME_FOLDER":
            await fetch("/api/finder", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(changes),
            });
            break;
          case "CREATE_FILE":
            await fetch("/api/finder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(changes),
            });
            break;
        }
        await fetchContents(state.currentPath);
      } catch (error) {
        console.error("Error saving changes:", error);
      } finally {
        setIsSaving(false);
      }
    },
    1000 // 1 second delay
  );

  useEffect(() => {
    // Fetch initial contents
    fetchContents(state.currentPath);
  }, []);

  async function fetchContents(path: string) {
    try {
      const response = await fetch(
        `/api/finder?path=${encodeURIComponent(path)}`
      );
      const data = await response.json();
      dispatch({ type: "SET_CONTENTS", payload: data });
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  }

  function handlePathChange(newPath: string) {
    dispatch({ type: "SET_PATH", payload: newPath });
    fetchContents(newPath);
  }

  function handleCreateFolder(name: string, x: number, y: number) {
    setIsSaving(true);
    debouncedSave({
      type: "CREATE_FOLDER",
      name,
      path: state.currentPath,
      x,
      y,
    });
  }

  function handleCreateFile(name: string, x: number, y: number) {
    setIsSaving(true);
    debouncedSave({
      type: "CREATE_FILE",
      name,
      path: state.currentPath,
      x,
      y,
    });
  }

  function handleMoveFolder(folderId: string, newPath: string) {
    setIsSaving(true);
    debouncedSave({ type: "MOVE_FOLDER", folderId, newPath });
  }

  function handleRenameFolder(folderId: string, newName: string) {
    setIsSaving(true);
    debouncedSave({ type: "RENAME_FOLDER", folderId, newName });
  }

  return (
    <div className="flex h-full">
      <Sidebar>
        <SidebarCategories />
      </Sidebar>
      <div className="flex flex-col flex-grow">
        <TopBar
          currentPath={state.currentPath}
          onPathChange={handlePathChange}
        />
        <MainArea
          folders={state.folders}
          files={state.files}
          selectedItems={state.selectedItems}
          onCreateFolder={handleCreateFolder}
          onCreateFile={handleCreateFile}
          onMoveFolder={handleMoveFolder}
          onRenameFolder={handleRenameFolder}
          dispatch={dispatch}
        />
      </div>
      <SaveIndicator isSaving={isSaving} />
    </div>
  );
}
