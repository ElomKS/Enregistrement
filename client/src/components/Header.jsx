import { todayStamp } from "../api/userService";

export default function Header({ userCount }) {
  return (
    <header className="mb-8">
      <div className="h-1 w-24 bg-accent rounded-full mb-6" />
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="font-mono text-xs tracking-widest text-accent uppercase mb-2">Registre / Réception</p>
          <h1 className="font-display text-4xl font-medium">Registre des utilisateurs</h1>
          <p className="text-ink-muted mt-2 text-sm">Inscrivez de nouveaux utilisateurs et gérez les enregistrements existants.</p>
        </div>
        <div className="font-mono text-right text-xs text-ink-muted hidden sm:block">
          <p>{userCount} enregistrés</p>
          <p>{todayStamp()}</p>
        </div>
      </div>
    </header>
  );
}
