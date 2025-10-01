import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Detalhe seção
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const section = await prisma.section.findUnique({
    where: { id },
    include: { employees: true, actions: true },
  });

  if (!section) {
    return NextResponse.json(
      { error: "Seção não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(section);
}

// PUT - Atualiza seção
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const section = await prisma.section.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(section);
}

// DELETE - Remove seção
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.section.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
