import { X, Phone, Briefcase, MessageSquare, Calendar, Hash } from "lucide-react";

export default function UserDetailPanel({ user, onClose, onEdit, onDelete }) {
  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="bg-panel card-shadow border border-border rounded-lg mt-4 animate-slide-up">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <h3 className="font-display text-lg text-ink-light">{fullName}</h3>
        <button
          onClick={onClose}
          className="text-ink-muted hover:text-ink-light transition-colors"
          aria-label="Fermer"
        >
          <X size={16} />
        </button>
      </div>

      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Hash size={14} className="text-accent shrink-0" />
          <span className="text-ink-muted">N° dossier :</span>
          <span className="font-mono text-ink-light">{user.recordNo}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Calendar size={14} className="text-accent shrink-0" />
          <span className="text-ink-muted">Inscrit le :</span>
          <span className="text-ink-light">{user.createdAt}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Phone size={14} className="text-accent shrink-0" />
          <span className="text-ink-muted">Téléphone :</span>
          <span className="text-ink-light">{user.phoneNumber}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Briefcase size={14} className="text-accent shrink-0" />
          <span className="text-ink-muted">Profession :</span>
          <span className="text-ink-light">{user.profession}</span>
        </div>

        {user.request && (
          <div className="flex items-start gap-3 text-sm">
            <MessageSquare size={14} className="text-accent shrink-0 mt-0.5" />
            <div>
              <span className="text-ink-muted">Demande :</span>
              <p className="text-ink-light mt-1 italic border-l-2 border-border pl-2">{user.request}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 px-5 pb-4">
        <button
          onClick={() => { onClose(); onEdit(user); }}
          className="text-sm px-4 py-2 rounded-md border border-border text-ink-muted hover:text-ink-light transition-colors"
        >
          Modifier
        </button>
        <button
          onClick={() => { onClose(); onDelete(user.id); }}
          className="text-sm px-4 py-2 rounded-md bg-danger text-danger-text font-medium hover:bg-danger-hover transition-colors"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
