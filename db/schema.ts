import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const influencers = sqliteTable("influencers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  instagram: text("instagram").notNull().default(""),
  phone: text("phone").notNull().default(""),
  commissionCents: integer("commission_cents").notNull().default(100000),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  influencerId: integer("influencer_id").notNull().references(() => influencers.id),
  kind: text("kind", { enum: ["click", "whatsapp"] }).notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const propertySettings = sqliteTable("property_settings", {
  id: integer("id").primaryKey(),
  title: text("title").notNull().default("Casa à venda"),
  location: text("location").notNull().default("Localização a confirmar"),
  originalPriceCents: integer("original_price_cents").notNull().default(0),
  discountPercent: integer("discount_percent").notNull().default(5),
  whatsappNumber: text("whatsapp_number").notNull().default(""),
  description: text("description").notNull().default("Um imóvel especial, com condição exclusiva para contatos vindos da nossa rede de influenciadores."),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
