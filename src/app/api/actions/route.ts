// @ts-expect-error
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const sectionId = searchParams.get("sectionId");

  if (!userId) {
    return NextResponse.json({ error: "userId obrigatório" }, { status: 400 });
  }

  const actions = await prisma.action.findMany({
    where: { userId, ...(sectionId && { sectionId }) },
    include: { employees: true, recurrence: true },
  });

  return NextResponse.json(actions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, status, dueDate, userId, sectionId } = body;

  if (!title || !userId || !sectionId) {
    return NextResponse.json(
      { error: "title, userId e sectionId obrigatórios" },
      { status: 400 }
    );
  }

  const action = await prisma.action.create({
    data: { title, description, status, dueDate, userId, sectionId },
  });

  return NextResponse.json(action, { status: 201 });
}
