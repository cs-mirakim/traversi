/**
 * Traversi User Registration Registry
 * Enforces mandatory Sign Up before Sign In can be granted.
 * Only demo Hang Tuah is pre-registered. Real accounts MUST sign up first.
 */

const DEFAULT_REGISTERED_EMAILS = ["hangtuah@traversi.my"];
const STORAGE_KEY = "traversi_registered_users_v2";

export function getRegisteredUsers(): string[] {
  if (typeof window === "undefined") return DEFAULT_REGISTERED_EMAILS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REGISTERED_EMAILS));
      return DEFAULT_REGISTERED_EMAILS;
    }
    const list: string[] = JSON.parse(raw);
    return Array.from(
      new Set([...DEFAULT_REGISTERED_EMAILS, ...list.map((e) => e.toLowerCase().trim())])
    );
  } catch {
    return DEFAULT_REGISTERED_EMAILS;
  }
}

export function isEmailRegistered(email: string): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  const list = getRegisteredUsers();
  return list.includes(cleanEmail);
}

export async function checkEmailRegisteredServer(email: string): Promise<boolean> {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();

  // 1. Quick check locally first
  if (isEmailRegistered(cleanEmail)) return true;

  // 2. Check server registry
  try {
    const res = await fetch(`/api/auth/registered?email=${encodeURIComponent(cleanEmail)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.isRegistered) {
        // Sync to local
        registerEmailLocal(cleanEmail);
        return true;
      }
    }
  } catch {
    // Fallback to local
  }
  return false;
}

function registerEmailLocal(cleanEmail: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getRegisteredUsers();
    if (!current.includes(cleanEmail)) {
      current.push(cleanEmail);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
  } catch {
    // ignore
  }
}

export function registerEmail(email: string): void {
  if (!email) return;
  const cleanEmail = email.trim().toLowerCase();
  registerEmailLocal(cleanEmail);

  // Sync to server
  if (typeof window !== "undefined") {
    fetch("/api/auth/registered", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail, action: "register" }),
    }).catch(() => {});
  }
}

export function unregisterEmail(email: string): void {
  if (!email) return;
  const cleanEmail = email.trim().toLowerCase();
  if (typeof window !== "undefined") {
    try {
      const current = getRegisteredUsers().filter(
        (e) => e !== cleanEmail && e !== "hangtuah@traversi.my"
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {
      // ignore
    }

    // Sync unregister to server
    fetch("/api/auth/registered", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail, action: "unregister" }),
    }).catch(() => {});
  }
}
