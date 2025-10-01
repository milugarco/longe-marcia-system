// lib/cron.ts
import cron from "node-cron";
import { prisma } from "@/lib/prisma";

declare global {
  // eslint-disable-next-line no-var
  var __recurrenceCronStarted: boolean | undefined;
}

/**
 * Reset APENAS quando o dia atual == dayOfMonth.
 * Recorrências sem dayOfMonth não disparam reset.
 */
function shouldResetToday(rec: {
  type: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  dayOfWeek: number | null;
  dayOfMonth: number | null;
}) {
  const now = new Date();
  if (rec.dayOfMonth == null) return false;
  return now.getDate() === rec.dayOfMonth;
}

export function startRecurrenceCron() {
  if (global.__recurrenceCronStarted) return; // evita múltiplos agendamentos em dev
  global.__recurrenceCronStarted = true;

  // Executa A CADA 30 SEGUNDOS
  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date().toISOString();
      console.log(`🔄 [CRON] Recurrences tick @ ${now}`);

      const recurrences = await prisma.recurrence.findMany({
        include: { actions: true },
      });

      for (const rec of recurrences) {
        if (!shouldResetToday(rec as any)) continue;

        for (const action of rec.actions) {
          // Se quiser evitar reset contínuo em loop, você pode checar aqui
          // se a action já está PENDING e pular.
          if (action.status !== "PENDING") {
            await prisma.action.update({
              where: { id: action.id },
              data: { status: "PENDING" },
            });
            console.log(`✅ Reset action "${action.title}" -> PENDING`);
          }
        }
      }
    } catch (err) {
      console.error("❌ [CRON] Erro:", err);
    }
  });
}
