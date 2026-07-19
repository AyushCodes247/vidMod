import {
  pgTable,
  pgEnum,
  bigserial,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const genderEnum = pgEnum("gender", [
  "male",
  "female",
  "others",
  "prefer_not_to_say",
]);

export const userTable = pgTable("users", {
  id: bigserial("id", { mode: "bigint" }).primaryKey(),

  publicId: uuid("public_id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .unique(),

  name: varchar("name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  password: text("password").notNull(),

  gender: genderEnum("gender").default("prefer_not_to_say").notNull(),

  isVerified: boolean("is_verified").default(false).notNull(),

  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),

  deletedAt: timestamp("deleted_at", {
    withTimezone: true,
    mode: "date",
  }),

  lastLoginAt: timestamp("last_login_at", {
    withTimezone: true,
    mode: "date",
  }),

  emailVerifiedAt: timestamp("email_verified_at", {
    withTimezone: true,
    mode: "date",
  }),
});
