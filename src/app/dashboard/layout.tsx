"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Conteúdo principal */}
      <main className="flex-1 p-4">{children}</main>

      {/* Botão de Logout fixo no canto inferior direito */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="destructive"
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
