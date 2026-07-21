import { Search } from "lucide-react";
import UserCard from "./UserCard";
import UserDetailPanel from "./UserDetailPanel";

export default function RegistryList({ filtered, query, setQuery, selectedUser, onSelect, onCloseDetail, onEdit, onDelete, isAdmin }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4 bg-panel card-shadow border border-border rounded-md px-3 py-2">
        <Search size={15} className="text-ink-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par nom ou téléphone"
          className="w-full bg-transparent text-ink-light text-sm outline-none"
        />
      </div>

      {query.trim() === "" ? (
        <div className="border border-dashed border-border rounded-lg py-16 text-center">
          <p className="font-display text-lg text-ink-muted">Recherchez pour voir les enregistrements.</p>
          <p className="text-sm text-ink-subtle mt-1">Recherchez un utilisateur par prénom, nom ou téléphone.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg py-16 text-center">
          <p className="font-display text-lg text-ink-muted">Aucun résultat.</p>
          <p className="text-sm text-ink-subtle mt-1">Essayez une autre recherche, ou inscrivez un nouvel utilisateur.</p>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {filtered.map((u) => (
              <UserCard key={u.id} user={u} onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </ul>
          <UserDetailPanel
            user={selectedUser}
            onClose={onCloseDetail}
            onEdit={onEdit}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />
        </>
      )}
    </div>
  );
}
