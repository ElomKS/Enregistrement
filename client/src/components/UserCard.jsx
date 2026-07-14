import { Pencil, Trash2, Phone } from "lucide-react";

const avatarColors = [
  "bg-[#C1584C]", "bg-[#C79A56]", "bg-[#6B9A78]",
  "bg-[#5A7FB5]", "bg-[#8B6BAF]", "bg-[#B5854A]",
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function getInitials(first, last) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export default function UserCard({ user, onSelect, onEdit, onDelete }) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <li
      className="bg-panel card-shadow border border-border rounded-lg flex items-stretch overflow-hidden hover:-translate-y-0.5 hover:card-shadow-lg hover:border-border-hover transition-all duration-200 animate-fade-in cursor-pointer"
      onClick={() => onSelect(user)}
    >
      <div className="flex-1 flex items-center gap-3 px-4 py-3 min-w-0">
        <div className={`w-10 h-10 rounded-full ${getAvatarColor(fullName)} flex items-center justify-center text-sm font-medium text-white shrink-0`}>
          {getInitials(user.firstName, user.lastName)}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg text-ink-light truncate">{fullName}</h3>
          <span className="flex items-center gap-1.5 text-sm text-ink-muted">
            <Phone size={12} />{user.phoneNumber}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 px-3 border-l border-border">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(user); }}
          className="text-ink-muted hover:text-accent transition-colors"
          aria-label={`Modifier ${fullName}`}
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(user.id); }}
          className="text-ink-muted hover:text-danger transition-colors"
          aria-label={`Supprimer ${fullName}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}
