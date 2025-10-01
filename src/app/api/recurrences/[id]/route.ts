import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Detalhe recorrência
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const recurrence = await prisma.recurrence.findUnique({
    where: { id },
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

// PUT - Atualiza recorrência
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const recurrence = await prisma.recurrence.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(recurrence);
}

// DELETE - Remove recorrência
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.recurrence.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
