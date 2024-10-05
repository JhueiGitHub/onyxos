import { NextResponse } from "next/server";
import {
  getFolderContents,
  createFolder,
  updateFolderLocation,
} from "@/lib/finder";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  try {
    // TODO: Get the actual user ID from the session
    const userId = "user123";
    const contents = await getFolderContents(userId, path);
    return NextResponse.json(contents);
  } catch (error) {
    console.error("Error in GET /api/finder:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { type, name, path, x, y } = body;

  if (type !== "CREATE_FOLDER" || !name || !path) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  try {
    // TODO: Get the actual user ID from the session
    const userId = "user123";
    const newFolder = await createFolder(userId, name, path, null);
    return NextResponse.json(newFolder);
  } catch (error) {
    console.error("Error in POST /api/finder:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { type, folderId, newPath } = body;

  if (type !== "MOVE_FOLDER" || !folderId || !newPath) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  try {
    const updatedFolder = await updateFolderLocation(folderId, newPath, null);
    return NextResponse.json(updatedFolder);
  } catch (error) {
    console.error("Error in PATCH /api/finder:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
