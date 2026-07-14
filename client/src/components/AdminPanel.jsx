import { useState, useEffect } from "react";
import { Users, Plus, Trash2 } from "lucide-react";
import { fetchAuthUsers, createAuthUser, deleteAuthUser } from "../api/userService";

export default function AdminPanel({ isOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) fetchAuthUsers().then(setUsers).catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleCreate(ev) {
    ev.preventDefault();
    setError("");
    setLoading(true);
    try {
      const created = await createAuthUser(username, password, role);
      setUsers((prev) => [created, ...prev]);
      setUsername("");
      setPassword("");
      setRole("staff");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAuthUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-6 z-50 animate-fade-in">
      <div className="bg-panel card-shadow-lg border border-border rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-accent" />
            <h3 className="font-display text-lg text-ink-light">Gérer les comptes</h3>
          </div>
          <button onClick={onClose} className="text-ink-muted hover:text-ink-light text-sm transition-colors">Fermer</button>
        </div>

        <form onSubmit={handleCreate} className="space-y-3 mb-5 border border-border rounded-md p-4">
          <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Nouveau compte</p>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-panel-input border border-border rounded-md px-3 py-2 text-ink-light text-sm outline-none focus:border-accent transition-colors"
          />
          <input
            type="password"
            placeholder="Mot de passe (min. 6 caractères)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-panel-input border border-border rounded-md px-3 py-2 text-ink-light text-sm outline-none focus:border-accent transition-colors"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-panel-input border border-border rounded-md px-3 py-2 text-ink-light text-sm outline-none focus:border-accent transition-colors"
          >
            <option value="staff">Staff (pas de suppression)</option>
            <option value="admin">Admin (accès complet)</option>
          </select>
          {error && <p className="text-danger text-sm animate-fade-in">{error}</p>}
          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-md bg-accent text-panel font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            <Plus size={14} /> {loading ? "Création..." : "Créer le compte"}
          </button>
        </form>

        <div>
          <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">Comptes existants</p>
          <ul className="space-y-2">
            {users.map((u) => (
              <li key={u.id} className="flex items-center justify-between bg-panel-input border border-border rounded-md px-3 py-2">
                <div>
                  <span className="text-ink-light text-sm">{u.username}</span>
                  <span className={`ml-2 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-medium ${u.role === "admin" ? "bg-accent/20 text-accent" : "bg-success/20 text-success"}`}>
                    {u.role}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-ink-muted hover:text-danger transition-colors"
                  aria-label={`Supprimer ${u.username}`}
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
