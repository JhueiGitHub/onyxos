// app/api/stellar/sidebar-categories/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, order } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const category = await prisma.sidebarCategory.create({
      data: {
        name,
        order,
        userId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[SIDEBAR_CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const categories = await prisma.sidebarCategory.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            folder: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[SIDEBAR_CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
