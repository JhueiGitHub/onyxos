// app/api/stellar/folders/[folderId]/assets/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { folderId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, type, url } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !type || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const folder = await prisma.folder.findUnique({
      where: {
        id: params.folderId,
        userId,
      },
    });

    if (!folder) {
      return new NextResponse("Folder not found", { status: 404 });
    }

    const asset = await prisma.asset.create({
      data: {
        name,
        type,
        url,
        folderId: params.folderId,
      },
    });

    return NextResponse.json(asset);
  } catch (error) {
    console.log("[ASSET_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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
    });

    if (!folder) {
      return new NextResponse("Folder not found", { status: 404 });
    }

    const assets = await prisma.asset.findMany({
      where: {
        folderId: params.folderId,
      },
    });

    return NextResponse.json(assets);
  } catch (error) {
    console.log("[ASSETS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
