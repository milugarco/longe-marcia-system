import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/actions/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const action = await prisma.action.findUnique({
    where: { id },
    include: { employees: true, recurrence: true },
  });

  if (!action) {
    return NextResponse.json({ error: "Ação não encontrada" }, { status: 404 });
  }

  return NextResponse.json(action);
}

// PUT /api/actions/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const action = await prisma.action.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(action);
}

// DELETE /api/actions/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.action.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
