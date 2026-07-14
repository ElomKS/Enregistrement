const USE_MOCK = false;
const API_BASE = "https://enregistrement-sypl.onrender.com/api/users";

const seedUsers = [
  { id: "1", recordNo: "0001", firstName: "Jorge", lastName: "Martinez", phoneNumber: "+33 6 12 34 56 78", profession: "Ingénieur structure", request: "Nécessite l'accès aux fichiers de projet archivés.", createdAt: "2026-06-02" },
  { id: "2", recordNo: "0002", firstName: "Anya", lastName: "Kapoor", phoneNumber: "+33 6 98 76 54 32", profession: "Designer produit", request: "", createdAt: "2026-06-14" },
  { id: "3", recordNo: "0003", firstName: "Lily", lastName: "Chen", phoneNumber: "+33 7 11 22 33 44", profession: "Analyste de données", request: "Souhaite une présentation du tableau de bord de reporting.", createdAt: "2026-06-20" },
];

async function apiCall(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export function nextRecordNo(users) {
  const max = users.reduce((m, u) => Math.max(m, parseInt(u.recordNo, 10) || 0), 0);
  return String(max + 1).padStart(4, "0");
}

export function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

export { seedUsers, apiCall, USE_MOCK };
