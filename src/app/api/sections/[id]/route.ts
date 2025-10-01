// @ts-ignore
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  const section = await prisma.section.findUnique({
    where: { id: params.id },
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

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const section = await prisma.section.update({
    where: { id: params.id },
    data: body,
  });

  return NextResponse.json(section);
}

export async function DELETE(req: Request, { params }: Params) {
  await prisma.section.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
