import prisma from "./prisma";
import { Folder, File } from "@prisma/client";

export async function createInitialStructure(userId: string) {
  try {
    const desktopFolder = await prisma.folder.create({
      data: {
        name: "Desktop",
        path: "/Desktop",
        userId,
      },
    });

    const documentsFolder = await prisma.folder.create({
      data: {
        name: "Documents",
        path: "/Documents",
        userId,
      },
    });

    const downloadsFolder = await prisma.folder.create({
      data: {
        name: "Downloads",
        path: "/Downloads",
        userId,
      },
    });

    return { desktopFolder, documentsFolder, downloadsFolder };
  } catch (error) {
    console.error("Error creating initial folder structure:", error);
    throw error;
  }
}

export async function getFolderContents(userId: string, path: string) {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId,
        path: {
          startsWith: path,
        },
        NOT: {
          path: path,
        },
      },
    });

    const files = await prisma.file.findMany({
      where: {
        userId,
        path: {
          startsWith: path,
        },
      },
    });

    return { folders, files };
  } catch (error) {
    console.error("Error fetching folder contents:", error);
    throw error;
  }
}

export async function createFolder(
  userId: string,
  name: string,
  path: string,
  parentId: string | null
) {
  try {
    const newFolder = await prisma.folder.create({
      data: {
        name,
        path,
        userId,
        parentId,
      },
    });
    return newFolder;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
}

export async function updateFolderLocation(
  folderId: string,
  newPath: string,
  newParentId: string | null
) {
  try {
    const updatedFolder = await prisma.folder.update({
      where: { id: folderId },
      data: {
        path: newPath,
        parentId: newParentId,
      },
    });
    return updatedFolder;
  } catch (error) {
    console.error("Error updating folder location:", error);
    throw error;
  }
}
