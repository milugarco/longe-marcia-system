// @ts-expect-error
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Cria funcionário já vinculado a uma ou mais seções
export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, role, userId, sectionIds } = body;

  if (!name || !userId) {
    return NextResponse.json(
      { error: "Nome e userId obrigatórios" },
      { status: 400 }
    );
  }

  const employee = await prisma.employee.create({
    data: {
      name,
      email,
      role,
      userId,
      sections: sectionIds
        ? {
            connect: sectionIds.map((id: string) => ({ id })),
          }
        : undefined,
    },
    include: { sections: true },
  });

  return NextResponse.json(employee, { status: 201 });
}
