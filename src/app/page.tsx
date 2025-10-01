"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // ou outro nome
    if (!token) {
      router.push("/login"); // se não tem token, manda pro login
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Button onClick={() => router.push("/dashboard")}>
        Ir para Dashboard
      </Button>
    </main>
  );
}
