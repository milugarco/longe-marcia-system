import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Detalhe funcionário
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { sections: true, actions: true },
  });

  if (!employee) {
    return NextResponse.json(
      { error: "Funcionário não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(employee);
}

// PUT - Atualiza funcionário
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const employee = await prisma.employee.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(employee);
}

// DELETE - Remove funcionário
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.employee.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
