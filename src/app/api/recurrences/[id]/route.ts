// @ts-ignore
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  const recurrence = await prisma.recurrence.findUnique({
    where: { id: params.id },
    include: { actions: true },
  });

  if (!recurrence) {
    return NextResponse.json(
      { error: "Recorrência não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(recurrence);
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const recurrence = await prisma.recurrence.update({
    where: { id: params.id },
    data: body,
  });

  return NextResponse.json(recurrence);
}

export async function DELETE(req: Request, { params }: Params) {
  await prisma.recurrence.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
