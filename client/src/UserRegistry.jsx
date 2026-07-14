import { useState, useMemo, useEffect } from "react";
import { seedUsers, apiCall, nextRecordNo, todayStamp, USE_MOCK } from "./api/userService";
import Header from "./components/Header";
import IntakeForm from "./components/IntakeForm";
import RegistryList from "./components/RegistryList";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

const emptyForm = { firstName: "", lastName: "", phoneNumber: "", profession: "", request: "" };

export default function UserRegistry() {
  const [users, setUsers] = useState(seedUsers);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (USE_MOCK) return;
    apiCall("").then(setUsers).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return users.filter(
      (u) =>
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.phoneNumber.toLowerCase().includes(q)
    );
  }, [users, query]);

  function validate(values) {
    const e = {};
    if (!values.firstName.trim()) e.firstName = "Le prénom est requis.";
    if (!values.lastName.trim()) e.lastName = "Le nom est requis.";
    if (values.firstName.trim() && values.lastName.trim()) {
      const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`.toLowerCase();
      if (users.some((u) => `${u.firstName} ${u.lastName}`.toLowerCase() === fullName && u.id !== editingId)) {
        e.firstName = "Ce nom est déjà utilisé.";
      }
    }
    if (!values.phoneNumber.trim()) e.phoneNumber = "Le numéro de téléphone est requis.";
    if (!values.profession.trim()) e.profession = "La profession est requise.";
    return e;
  }

  function resetForm() {
    setForm(emptyForm);
    setErrors({});
    setEditingId(null);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSaving(true);
    setStatus(null);
    try {
      if (editingId) {
        if (USE_MOCK) {
          setUsers((prev) => prev.map((u) => (u.id === editingId ? { ...u, ...form } : u)));
        } else {
          const updated = await apiCall(`/${editingId}`, { method: "PUT", body: JSON.stringify(form) });
          setUsers((prev) => prev.map((u) => (u.id === editingId ? updated : u)));
        }
        setStatus({ type: "success", text: "Enregistrement mis à jour." });
      } else {
        if (USE_MOCK) {
          const newUser = {
            id: crypto.randomUUID(),
            recordNo: nextRecordNo(users),
            createdAt: todayStamp(),
            ...form,
          };
          setUsers((prev) => [newUser, ...prev]);
        } else {
          const created = await apiCall("", { method: "POST", body: JSON.stringify(form) });
          setUsers((prev) => [created, ...prev]);
        }
        setStatus({ type: "success", text: "Utilisateur inscrit." });
      }
      resetForm();
    } catch {
      setStatus({ type: "error", text: "Impossible d'enregistrer. Réessayez." });
    } finally {
      setSaving(false);
    }
  }

  function startEdit(user) {
    setEditingId(user.id);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      profession: user.profession,
      request: user.request || "",
    });
    setErrors({});
    setStatus(null);
  }

  async function confirmDelete() {
    const id = pendingDelete;
    setPendingDelete(null);
    setSelectedUser(null);
    try {
      if (!USE_MOCK) await apiCall(`/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (editingId === id) resetForm();
      setStatus({ type: "success", text: "Enregistrement supprimé." });
    } catch {
      setStatus({ type: "error", text: "Impossible de supprimer cet enregistrement." });
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-surface via-surface-dark to-surface-deep text-ink font-sans">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Header userCount={users.length} />

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          <IntakeForm
            editingId={editingId}
            form={form}
            setForm={setForm}
            errors={errors}
            status={status}
            saving={saving}
            onSubmit={handleSubmit}
            onCancelEdit={resetForm}
          />
          <RegistryList
            filtered={filtered}
            query={query}
            setQuery={setQuery}
            selectedUser={selectedUser}
            onSelect={setSelectedUser}
            onCloseDetail={() => setSelectedUser(null)}
            onEdit={startEdit}
            onDelete={setPendingDelete}
          />
        </div>
      </div>

      {pendingDelete && (
        <DeleteConfirmModal onConfirm={confirmDelete} onCancel={() => setPendingDelete(null)} />
      )}
    </div>
  );
}
