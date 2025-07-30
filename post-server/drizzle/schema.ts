import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, mysqlEnum, timestamp, unique, serial, text, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const postReactions = mysqlTable("post_reactions", {
	userId: int("user_id").notNull(),
	postId: int("post_id").notNull(),
	reactionType: mysqlEnum("reaction_type", ['like','dislike']).notNull(),
	reactedAt: timestamp("reacted_at", { mode: 'string' }).default(sql`(now())`),
},
(table) => [
	primaryKey({ columns: [table.userId, table.postId], name: "post_reactions_user_id_post_id"}),
]);

export const posts = mysqlTable("posts", {
	id: serial().notNull(),
	userId: int("user_id").notNull(),
	title: text().notNull(),
	content: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
},
(table) => [
	primaryKey({ columns: [table.id], name: "posts_id"}),
	unique("id").on(table.id),
]);

export const users = mysqlTable("users", {
	id: serial().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 250 }).notNull(),
	password: varchar({ length: 250 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("id").on(table.id),
	unique("users_email_unique").on(table.email),
]);
