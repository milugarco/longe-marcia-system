//
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId obrigatório" }, { status: 400 });
  }

  const sections = await prisma.section.findMany({
    where: { userId },
    include: { employees: true, actions: true },
  });

  return NextResponse.json(sections);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, userId } = body;

  if (!name || !userId) {
    return NextResponse.json(
      { error: "Nome e userId obrigatórios" },
      { status: 400 }
    );
  }

  const section = await prisma.section.create({ data: { name, userId } });
  return NextResponse.json(section, { status: 201 });
}
