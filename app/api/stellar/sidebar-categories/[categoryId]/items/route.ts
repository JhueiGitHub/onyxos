// app/api/stellar/sidebar-categories/[categoryId]/items/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { folderId, order } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!folderId) {
      return new NextResponse("Folder ID is required", { status: 400 });
    }

    const category = await prisma.sidebarCategory.findUnique({
      where: {
        id: params.categoryId,
        userId,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const item = await prisma.sidebarItem.create({
      data: {
        folderId,
        categoryId: params.categoryId,
        order,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.log("[SIDEBAR_ITEM_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await prisma.sidebarCategory.findUnique({
      where: {
        id: params.categoryId,
        userId,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const items = await prisma.sidebarItem.findMany({
      where: {
        categoryId: params.categoryId,
      },
      include: {
        folder: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.log("[SIDEBAR_ITEMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { items } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!items || !Array.isArray(items)) {
      return new NextResponse("Invalid items data", { status: 400 });
    }

    const category = await prisma.sidebarCategory.findUnique({
      where: {
        id: params.categoryId,
        userId,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Update the order of items
    await Promise.all(
      items.map((item, index) =>
        prisma.sidebarItem.update({
          where: { id: item.id },
          data: { order: index },
        })
      )
    );

    return new NextResponse("Items updated successfully", { status: 200 });
  } catch (error) {
    console.log("[SIDEBAR_ITEMS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
