import { env } from "cloudflare:workers";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "asb_admin";

async function digest(value: string) {
  const data = new TextEncoder().encode(`as-braz-admin:${value}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function adminToken() { return digest(env.ADMIN_PASSWORD || ""); }

export async function isAdmin() {
  if (!env.ADMIN_PASSWORD) return false;
  return (await cookies()).get(ADMIN_COOKIE)?.value === await adminToken();
}

export function getAdminPassword() { return env.ADMIN_PASSWORD || ""; }
