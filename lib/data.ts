import { and, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { events, influencers, propertySettings } from "@/db/schema";

export async function ensureSettings() {
  const db = getDb();
  await db.insert(propertySettings).values({ id: 1 }).onConflictDoNothing();
  return (await db.select().from(propertySettings).where(eq(propertySettings.id, 1)).limit(1))[0];
}

export async function getInfluencer(slug: string) {
  return (await getDb().select().from(influencers).where(and(eq(influencers.slug, slug), eq(influencers.active, true))).limit(1))[0];
}

export async function recordEvent(influencerId: number, kind: "click" | "whatsapp") {
  await getDb().insert(events).values({ influencerId, kind });
}

export async function getDashboardData() {
  const db = getDb();
  const rows = await db.select({
    id: influencers.id, name: influencers.name, slug: influencers.slug,
    instagram: influencers.instagram, phone: influencers.phone,
    active: influencers.active, commissionCents: influencers.commissionCents,
    createdAt: influencers.createdAt,
    clicks: sql<number>`coalesce(sum(case when ${events.kind} = 'click' then 1 else 0 end), 0)`,
    whatsapps: sql<number>`coalesce(sum(case when ${events.kind} = 'whatsapp' then 1 else 0 end), 0)`,
  }).from(influencers).leftJoin(events, eq(events.influencerId, influencers.id)).groupBy(influencers.id).orderBy(desc(influencers.createdAt));
  const totals = rows.reduce((acc, row) => ({ clicks: acc.clicks + Number(row.clicks), whatsapps: acc.whatsapps + Number(row.whatsapps) }), { clicks: 0, whatsapps: 0 });
  return { rows, totals, settings: await ensureSettings() };
}

export function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
