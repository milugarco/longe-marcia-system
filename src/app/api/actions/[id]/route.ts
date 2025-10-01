// @ts-ignore
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  const action = await prisma.action.findUnique({
    where: { id: params.id },
    include: { employees: true, recurrence: true },
  });

  if (!action) {
    return NextResponse.json({ error: "Ação não encontrada" }, { status: 404 });
  }

  return NextResponse.json(action);
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const action = await prisma.action.update({
    where: { id: params.id },
    data: body,
  });

  return NextResponse.json(action);
}

export async function DELETE(req: Request, { params }: Params) {
  await prisma.action.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
