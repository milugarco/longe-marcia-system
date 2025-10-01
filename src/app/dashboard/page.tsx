"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

export default function DashboardHome() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [selectedSection, setSelectedSection] = useState<any | null>(null);

  // estados para modais de edição/confirm
  const [editSectionModal, setEditSectionModal] = useState<{
    open: boolean;
    id?: string;
    name?: string;
  }>({ open: false });
  const [editEmployeeModal, setEditEmployeeModal] = useState<{
    open: boolean;
    id?: string;
    name?: string;
    role?: string;
  }>({ open: false });
  const [editActionModal, setEditActionModal] = useState<{
    open: boolean;
    id?: string;
    title?: string;
  }>({ open: false });
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    type?: string;
    id?: string;
  }>({ open: false });
  // novos estados para criação
  const [createEmployeeModal, setCreateEmployeeModal] = useState<{
    open: boolean;
    name?: string;
    role?: string;
  }>({ open: false });
  const [createActionModal, setCreateActionModal] = useState<{
    open: boolean;
    title?: string;
    status?: string;
  }>({ open: false });
  const [recurrenceModal, setRecurrenceModal] = useState<{
    open: boolean;
    actionId?: string;
    recurrences?: any[];
  }>({ open: false });
  const [editRecurrenceModal, setEditRecurrenceModal] = useState<{
    open: boolean;
    id?: string;
    type?: string;
    dayOfMonth?: number;
    dayOfWeek?: number;
    interval?: number;
  }>({ open: false });
  const [createRecurrenceModal, setCreateRecurrenceModal] = useState<{
    open: boolean;
    type?: string;
    dayOfMonth?: number;
    dayOfWeek?: number;
    interval?: number;
  }>({ open: false });
  const [createSectionModal, setCreateSectionModal] = useState<{
    open: boolean;
    name?: string;
  }>({ open: false });

  const createSection = async (name: string) => {
    const res = await fetch("/api/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        userId, // vínculo com usuário logado
      }),
    });
    return res.json();
  };

  // helpers de criação
  const createEmployee = async (
    sectionId: string,
    name: string,
    role: string
  ) => {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        role,
        sectionIds: [sectionId],
        userId: selectedSection.userId,
      }),
    });
    return res.json();
  };

  const createAction = async (
    sectionId: string,
    title: string,
    status: string
  ) => {
    const res = await fetch("/api/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        status,
        sectionId,
        userId: selectedSection.userId,
      }),
    });
    return res.json();
  };

  // Helpers API
  const updateSection = async (id: string, data: any) => {
    const res = await fetch(`/api/sections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  const deleteSection = async (id: string) => {
    await fetch(`/api/sections/${id}`, { method: "DELETE" });
  };

  const updateEmployee = async (id: string, data: any) => {
    const res = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  const deleteEmployee = async (id: string) => {
    await fetch(`/api/employees/${id}`, { method: "DELETE" });
  };

  const updateAction = async (id: string, data: any) => {
    const res = await fetch(`/api/actions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  const deleteAction = async (id: string) => {
    await fetch(`/api/actions/${id}`, { method: "DELETE" });
  };

  const fetchRecurrences = async (userId: string) => {
    const res = await fetch(`/api/recurrences?userId=${userId}`);
    return res.json();
  };

  const createRecurrence = async (data: any) => {
    const res = await fetch(`/api/recurrences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // precisa conter { ..., actionId }
    });
    return res.json();
  };

  const updateRecurrence = async (id: string, data: any) => {
    const res = await fetch(`/api/recurrences/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  const deleteRecurrence = async (id: string) => {
    await fetch(`/api/recurrences/${id}`, { method: "DELETE" });
  };

  // Carregar seções (igual ao seu)
  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchUserAndSections = async () => {
      const userRes = await fetch(
        `/api/users/by-email?email=${session.user.email}`
      );
      const userData = await userRes.json();
      if (userData) setUserId(userData.id);
      const res = await fetch(`/api/sections?userId=${userData.id}`);
      const data = await res.json();
      setSections(data);
    };
    fetchUserAndSections();
  }, [session?.user?.email]);

  return (
    <div className="flex flex-col gap-4 pb-16">
      <h1 className="text-xl font-bold">Bem-vindo(a), {session?.user?.name}</h1>

      {/* Listagem */}
      <div className="flex flex-col gap-3">
        {sections.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelectedSection(s)}
            className="p-4 rounded-xl shadow-md bg-card hover:bg-accent transition cursor-pointer"
          >
            <h2 className="font-semibold">{s.name}</h2>
            <p className="text-sm text-muted-foreground">
              {s.employees?.length || 0} responsável(is) •{" "}
              {s.actions?.length || 0} tarefas
            </p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-12 right-4 z-50">
        <Button
          size="lg"
          className="rounded-full h-12 w-12 p-0"
          onClick={() => setCreateSectionModal({ open: true, name: "" })}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Modal de criação de seção */}
      <Dialog
        open={createSectionModal.open}
        onOpenChange={() => setCreateSectionModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Seção</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Nome da seção"
            value={createSectionModal.name}
            onChange={(e) =>
              setCreateSectionModal((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <div className="flex justify-end gap-2 mt-3">
            <Button
              variant="outline"
              onClick={() => setCreateSectionModal({ open: false })}
            >
              Cancelar
            </Button>
            <Button
              onClick={async () => {
                if (createSectionModal.name) {
                  const created = await createSection(createSectionModal.name);
                  setSections((prev) => [...prev, created]);
                }
                setCreateSectionModal({ open: false });
              }}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal da seção */}
      <Dialog
        open={!!selectedSection}
        onOpenChange={() => setSelectedSection(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex  items-center justify-between">
              {selectedSection?.name}
              <div className="flex mr-12 gap-2 ">
                <Button
                  size="sm"
                  onClick={() =>
                    setEditSectionModal({
                      open: true,
                      id: selectedSection.id,
                      name: selectedSection.name,
                    })
                  }
                >
                  Editar
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Funcionários */}
          <h3 className="font-semibold">Funcionários</h3>
          <Button
            size="sm"
            onClick={() =>
              setCreateEmployeeModal({ open: true, name: "", role: "" })
            }
          >
            + Adicionar
          </Button>
          {selectedSection?.employees?.map((e: any) => (
            <div
              key={e.id}
              className="flex justify-between items-center p-2 bg-muted rounded"
            >
              <span>
                {e.name} — {e.role}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    setEditEmployeeModal({
                      open: true,
                      id: e.id,
                      name: e.name,
                      role: e.role,
                    })
                  }
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setConfirmModal({ open: true, type: "employee", id: e.id })
                  }
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}

          {/* Ações */}
          <h3 className="font-semibold mt-4">Tarefas</h3>
          <Button
            size="sm"
            onClick={() =>
              setCreateActionModal({ open: true, title: "", status: "PENDING" })
            }
          >
            + Adicionar
          </Button>
          {selectedSection?.actions?.map((a: any) => (
            <div
              key={a.id}
              className="flex justify-between items-center p-2 bg-muted rounded"
            >
              <span>{a.title}</span>
              <div className="flex justify-between items-center gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    setEditActionModal({ open: true, id: a.id, title: a.title })
                  }
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setConfirmModal({ open: true, type: "action", id: a.id })
                  }
                >
                  Excluir
                </Button>
                <div
                  key={a.id}
                  className="flex justify-between items-center rounded-md"
                >
                  <div className="flex gap-2 items-center">
                    {/* status select aqui */}
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={async () => {
                        if (!userId) return; // evita rodar sem session
                        const recs = await fetchRecurrences(userId);
                        console.log(recs);
                        setRecurrenceModal({
                          open: true,
                          actionId: a.id,
                          recurrences: recs.filter((r: any) =>
                            r.actions.some((act: any) => act.id === a.id)
                          ),
                        });
                      }}
                    >
                      ⚙️
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DialogContent>
      </Dialog>

      {/* Modal editar seção */}
      <Dialog
        open={editSectionModal.open}
        onOpenChange={() => setEditSectionModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Seção</DialogTitle>
          </DialogHeader>
          <Input
            value={editSectionModal.name}
            onChange={(e) =>
              setEditSectionModal((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Button
            onClick={async () => {
              if (editSectionModal.id) {
                const updated = await updateSection(editSectionModal.id, {
                  name: editSectionModal.name,
                });
                setSections((prev) =>
                  prev.map((s) => (s.id === updated.id ? updated : s))
                );
                setSelectedSection(updated);
              }
              setEditSectionModal({ open: false });
            }}
          >
            Salvar
          </Button>
        </DialogContent>
      </Dialog>

      {/* Modal editar funcionário */}
      <Dialog
        open={editEmployeeModal.open}
        onOpenChange={() => setEditEmployeeModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Funcionário</DialogTitle>
          </DialogHeader>
          <Input
            value={editEmployeeModal.name}
            onChange={(e) =>
              setEditEmployeeModal((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <Input
            value={editEmployeeModal.role}
            onChange={(e) =>
              setEditEmployeeModal((prev) => ({
                ...prev,
                role: e.target.value,
              }))
            }
          />
          <Button
            onClick={async () => {
              if (editEmployeeModal.id) {
                const updated = await updateEmployee(editEmployeeModal.id, {
                  name: editEmployeeModal.name,
                  role: editEmployeeModal.role,
                });
                setSelectedSection((prev: any) => ({
                  ...prev,
                  employees: prev.employees.map((emp: any) =>
                    emp.id === updated.id ? updated : emp
                  ),
                }));
              }
              setEditEmployeeModal({ open: false });
            }}
          >
            Salvar
          </Button>
        </DialogContent>
      </Dialog>

      {/* Modal editar ação */}
      <Dialog
        open={editActionModal.open}
        onOpenChange={() => setEditActionModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
          </DialogHeader>
          <Input
            value={editActionModal.title}
            onChange={(e) =>
              setEditActionModal((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Button
            onClick={async () => {
              if (editActionModal.id) {
                const updated = await updateAction(editActionModal.id, {
                  title: editActionModal.title,
                });
                setSelectedSection((prev: any) => ({
                  ...prev,
                  actions: prev.actions.map((act: any) =>
                    act.id === updated.id ? updated : act
                  ),
                }));
              }
              setEditActionModal({ open: false });
            }}
          >
            Salvar
          </Button>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmação */}
      <Dialog
        open={confirmModal.open}
        onOpenChange={() => setConfirmModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Deseja realmente excluir?</p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setConfirmModal({ open: false })}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (confirmModal.id && confirmModal.type === "section") {
                  await deleteSection(confirmModal.id);
                  setSections((prev) =>
                    prev.filter((s) => s.id !== confirmModal.id)
                  );
                  setSelectedSection(null);
                }
                if (confirmModal.id && confirmModal.type === "employee") {
                  await deleteEmployee(confirmModal.id);
                  setSelectedSection((prev: any) => ({
                    ...prev,
                    employees: prev.employees.filter(
                      (emp: any) => emp.id !== confirmModal.id
                    ),
                  }));
                }
                if (confirmModal.id && confirmModal.type === "action") {
                  await deleteAction(confirmModal.id);
                  setSelectedSection((prev: any) => ({
                    ...prev,
                    actions: prev.actions.filter(
                      (act: any) => act.id !== confirmModal.id
                    ),
                  }));
                }
                setConfirmModal({ open: false });
              }}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={createEmployeeModal.open}
        onOpenChange={() => setCreateEmployeeModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Funcionário</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Nome"
            value={createEmployeeModal.name}
            onChange={(e) =>
              setCreateEmployeeModal((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Função"
            value={createEmployeeModal.role}
            onChange={(e) =>
              setCreateEmployeeModal((prev) => ({
                ...prev,
                role: e.target.value,
              }))
            }
          />
          <div className="flex justify-end gap-2 mt-3">
            <Button
              variant="outline"
              onClick={() => setCreateEmployeeModal({ open: false })}
            >
              Cancelar
            </Button>
            <Button
              onClick={async () => {
                if (
                  selectedSection?.id &&
                  createEmployeeModal.name &&
                  createEmployeeModal.role
                ) {
                  const created = await createEmployee(
                    selectedSection.id,
                    createEmployeeModal.name,
                    createEmployeeModal.role
                  );
                  setSelectedSection((prev: any) => ({
                    ...prev,
                    employees: [...prev.employees, created],
                  }));
                }
                setCreateEmployeeModal({ open: false });
              }}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={createActionModal.open}
        onOpenChange={() => setCreateActionModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Título"
            value={createActionModal.title}
            onChange={(e) =>
              setCreateActionModal((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
          <Select
            value={createActionModal.status}
            onValueChange={(val) =>
              setCreateActionModal((prev) => ({ ...prev, status: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pendente</SelectItem>
              <SelectItem value="IN_PROGRESS">Em andamento</SelectItem>
              <SelectItem value="DONE">Concluído</SelectItem>
              <SelectItem value="DELAYED">Atrasado</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-end gap-2 mt-3">
            <Button
              variant="outline"
              onClick={() => setCreateActionModal({ open: false })}
            >
              Cancelar
            </Button>
            <Button
              onClick={async () => {
                if (selectedSection?.id && createActionModal.title) {
                  const created = await createAction(
                    selectedSection.id,
                    createActionModal.title,
                    createActionModal.status || "PENDING"
                  );
                  setSelectedSection((prev: any) => ({
                    ...prev,
                    actions: [...prev.actions, created],
                  }));
                }
                setCreateActionModal({ open: false });
              }}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={recurrenceModal.open}
        onOpenChange={() => setRecurrenceModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recorrências</DialogTitle>
          </DialogHeader>

          {/* Listagem */}
          <ul className="space-y-2">
            {recurrenceModal.recurrences?.map((r: any) => (
              <li
                key={r.id}
                className="flex justify-between items-center p-2 bg-muted rounded"
              >
                <span>
                  {r.type}
                  {r.dayOfMonth && ` • Dia ${r.dayOfMonth}`}
                  {r.dayOfWeek && ` • Semana dia ${r.dayOfWeek}`}
                  {r.interval && ` • Intervalo ${r.interval}`}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setEditRecurrenceModal({ open: true, ...r })}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      await deleteRecurrence(r.id);
                      setRecurrenceModal((prev) => ({
                        ...prev,
                        recurrences: prev.recurrences?.filter(
                          (x: any) => x.id !== r.id
                        ),
                      }));
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {/* Botão adicionar */}
          <div className="mt-4 text-right">
            <Button
              onClick={() =>
                setCreateRecurrenceModal({ open: true, type: "MONTHLY" })
              }
            >
              + Nova Recorrência
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={createRecurrenceModal.open}
        onOpenChange={() => setCreateRecurrenceModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Recorrência</DialogTitle>
          </DialogHeader>

          {/* Tipo */}
          <Select
            value={createRecurrenceModal.type}
            onValueChange={(val) =>
              setCreateRecurrenceModal((prev) => ({ ...prev, type: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">Diária</SelectItem>
              <SelectItem value="WEEKLY">Semanal</SelectItem>
              <SelectItem value="MONTHLY">Mensal</SelectItem>
              <SelectItem value="YEARLY">Anual</SelectItem>
            </SelectContent>
          </Select>

          {/* Dia do mês */}
          <Input
            placeholder="Dia do Mês"
            type="number"
            value={createRecurrenceModal.dayOfMonth || ""}
            onChange={(e) =>
              setCreateRecurrenceModal((prev) => ({
                ...prev,
                dayOfMonth: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />

          {/* Dia da semana */}
          <Input
            placeholder="Dia da Semana (0=Domingo)"
            type="number"
            value={createRecurrenceModal.dayOfWeek || ""}
            onChange={(e) =>
              setCreateRecurrenceModal((prev) => ({
                ...prev,
                dayOfWeek: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />

          {/* Intervalo */}
          <Input
            placeholder="Intervalo (ex: a cada X dias/meses)"
            type="number"
            value={createRecurrenceModal.interval || ""}
            onChange={(e) =>
              setCreateRecurrenceModal((prev) => ({
                ...prev,
                interval: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />

          {/* Botões */}
          <div className="flex justify-end gap-2 mt-3">
            <Button
              variant="outline"
              onClick={() => setCreateRecurrenceModal({ open: false })}
            >
              Cancelar
            </Button>
            <Button
              onClick={async () => {
                if (!recurrenceModal.actionId) return;

                const userRes = await fetch(
                  `/api/users/by-email?email=${session?.user?.email}`
                );
                const userData = await userRes.json();

                // Envia actionId junto para já criar relação
                const created = await createRecurrence({
                  type: createRecurrenceModal.type,
                  dayOfMonth: createRecurrenceModal.dayOfMonth,
                  dayOfWeek: createRecurrenceModal.dayOfWeek,
                  interval: createRecurrenceModal.interval,
                  userId: userData.id,
                  actionId: recurrenceModal.actionId, // 👈 aqui é o vínculo!
                });

                // Atualiza recurrences no state local
                setRecurrenceModal((prev) => ({
                  ...prev,
                  recurrences: [...(prev.recurrences || []), created],
                }));

                setCreateRecurrenceModal({ open: false });
              }}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={editRecurrenceModal.open}
        onOpenChange={() => setEditRecurrenceModal({ open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Recorrência</DialogTitle>
          </DialogHeader>
          <Select
            value={editRecurrenceModal.type}
            onValueChange={(val) =>
              setEditRecurrenceModal((prev) => ({ ...prev, type: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">Diária</SelectItem>
              <SelectItem value="WEEKLY">Semanal</SelectItem>
              <SelectItem value="MONTHLY">Mensal</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Dia do Mês"
            type="number"
            value={editRecurrenceModal.dayOfMonth || ""}
            onChange={(e) =>
              setEditRecurrenceModal((prev) => ({
                ...prev,
                dayOfMonth: Number(e.target.value),
              }))
            }
          />
          <Input
            placeholder="Dia da Semana"
            type="number"
            value={editRecurrenceModal.dayOfWeek || ""}
            onChange={(e) =>
              setEditRecurrenceModal((prev) => ({
                ...prev,
                dayOfWeek: Number(e.target.value),
              }))
            }
          />
          <Input
            placeholder="Intervalo"
            type="number"
            value={editRecurrenceModal.interval || ""}
            onChange={(e) =>
              setEditRecurrenceModal((prev) => ({
                ...prev,
                interval: Number(e.target.value),
              }))
            }
          />
          <div className="flex justify-end gap-2 mt-3">
            <Button
              variant="outline"
              onClick={() => setEditRecurrenceModal({ open: false })}
            >
              Cancelar
            </Button>
            <Button
              onClick={async () => {
                if (editRecurrenceModal.id) {
                  const updated = await updateRecurrence(
                    editRecurrenceModal.id,
                    editRecurrenceModal
                  );
                  setRecurrenceModal((prev) => ({
                    ...prev,
                    recurrences: prev.recurrences?.map((r: any) =>
                      r.id === updated.id ? updated : r
                    ),
                  }));
                }
                setEditRecurrenceModal({ open: false });
              }}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
