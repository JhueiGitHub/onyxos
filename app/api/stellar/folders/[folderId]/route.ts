// app/api/stellar/folders/[folderId]/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { folderId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const folder = await prisma.folder.findUnique({
      where: {
        id: params.folderId,
        userId,
      },
      include: {
        children: true,
        assets: true,
      },
    });

    if (!folder) {
      return new NextResponse("Folder not found", { status: 404 });
    }

    return NextResponse.json(folder);
  } catch (error) {
    console.log("[FOLDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { folderId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, parentId, positionX, positionY } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const folder = await prisma.folder.update({
      where: {
        id: params.folderId,
        userId,
      },
      data: {
        name,
        parentId,
        positionX,
        positionY,
      },
    });

    return NextResponse.json(folder);
  } catch (error) {
    console.log("[FOLDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { folderId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const folder = await prisma.folder.delete({
      where: {
        id: params.folderId,
        userId,
      },
    });

    return NextResponse.json(folder);
  } catch (error) {
    console.log("[FOLDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}