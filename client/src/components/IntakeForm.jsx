import { X, Phone, Briefcase, MessageSquare, User as UserIcon } from "lucide-react";
import Field from "./Field";

const inputClass = (hasError) =>
  `w-full bg-panel-input text-ink-light border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors ${
    hasError ? "border-danger" : "border-border"
  }`;

export default function IntakeForm({
  editingId,
  form,
  setForm,
  errors,
  status,
  saving,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <div className="bg-panel card-shadow border border-border rounded-lg overflow-hidden h-fit">
      <div className="stub-line px-5 py-3 border-b border-border flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {editingId ? "Modifier l'enregistrement" : "Nouvelle fiche d'inscription"}
        </span>
        {editingId && (
          <button
            onClick={onCancelEdit}
            className="text-ink-muted hover:text-ink-light transition-colors"
            aria-label="Annuler la modification"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="p-5 space-y-4">
        <Field
          label="Prénom"
          icon={<UserIcon size={14} />}
          error={errors.firstName}
          input={
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="Jorge"
              className={inputClass(errors.firstName)}
            />
          }
        />
        <Field
          label="Nom"
          icon={<UserIcon size={14} />}
          error={errors.lastName}
          input={
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder="Martinez"
              className={inputClass(errors.lastName)}
            />
          }
        />
        <Field
          label="Numéro de téléphone"
          icon={<Phone size={14} />}
          error={errors.phoneNumber}
          input={
            <input
              type="tel"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              placeholder="+33 6 12 34 56 78"
              className={inputClass(errors.phoneNumber)}
            />
          }
        />
        <Field
          label="Profession"
          icon={<Briefcase size={14} />}
          error={errors.profession}
          input={
            <input
              type="text"
              value={form.profession}
              onChange={(e) => setForm({ ...form, profession: e.target.value })}
              placeholder="Ingénieur structure"
              className={inputClass(errors.profession)}
            />
          }
        />
        <Field
          label="Demande (facultatif)"
          icon={<MessageSquare size={14} />}
          input={
            <textarea
              value={form.request}
              onChange={(e) => setForm({ ...form, request: e.target.value })}
              placeholder="Une demande spécifique pour cet utilisateur..."
              rows={3}
              className="w-full bg-panel-input text-ink-light border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors resize-none"
            />
          }
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-accent text-panel-input font-medium text-sm rounded-md py-2.5 hover:bg-accent-hover transition-colors disabled:opacity-60"
        >
          {editingId ? "Enregistrer" : "Inscrire l'utilisateur"}
        </button>

        {status && (
          <p className={`text-xs font-mono animate-fade-in ${status.type === "success" ? "text-success" : "text-danger"}`}>
            {status.text}
          </p>
        )}
      </form>
    </div>
  );
}
