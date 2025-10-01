// @ts-expect-error
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

// GET - Detalhe funcionário
export async function GET(req: Request, { params }: Params) {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
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
export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const employee = await prisma.employee.update({
    where: { id: params.id },
    data: body,
  });

  return NextResponse.json(employee);
}

// DELETE - Remove funcionário
export async function DELETE(req: Request, { params }: Params) {
  await prisma.employee.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
