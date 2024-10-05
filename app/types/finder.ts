import { Folder, File } from "@prisma/client";

export interface FinderState {
  currentPath: string;
  folders: Folder[];
  files: File[];
  selectedItems: string[];
}

export interface FinderAction {
  type:
    | "SET_PATH"
    | "SET_CONTENTS"
    | "ADD_FOLDER"
    | "UPDATE_FOLDER"
    | "SELECT_ITEM"
    | "DESELECT_ITEM";
  payload: any;
}
