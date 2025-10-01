// @ts-ignore
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId obrigatório" }, { status: 400 });
  }

  const recurrences = await prisma.recurrence.findMany({
    where: { userId },
    include: { actions: true },
  });

  return NextResponse.json(recurrences);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { type, dayOfMonth, dayOfWeek, interval, userId, actionId } = body;

  if (!type || !userId) {
    return NextResponse.json(
      { error: "type e userId obrigatórios" },
      { status: 400 }
    );
  }

  const recurrence = await prisma.recurrence.create({
    data: {
      type,
      dayOfMonth,
      dayOfWeek,
      interval,
      userId,
      actions: actionId ? { connect: { id: actionId } } : undefined,
    },
    include: { actions: true },
  });

  return NextResponse.json(recurrence, { status: 201 });
}
