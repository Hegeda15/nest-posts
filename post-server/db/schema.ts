import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, mysqlEnum, timestamp, unique, serial, text, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"
import { foreignKey } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: int("id").primaryKey().autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 250 }).notNull(),
	password: varchar({ length: 250 }).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "users_id" }),
		
		unique("users_email_unique").on(table.email),
	]);

export const posts = mysqlTable("posts", {
	id: int("id").primaryKey().autoincrement().notNull(),
	userId: int("user_id").notNull(),
	title: text().notNull(),
	content: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	imageUrl: varchar('image_url', { length: 255 })
},
	(table) => [
		primaryKey({ columns: [table.id], name: "posts_id" }),
		

		foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: "posts_user_id_fkey"})
	]);

export const postReactions = mysqlTable("post_reactions", {
	userId: int("user_id").notNull(),
	postId: int("post_id").notNull(),
	reactionType: mysqlEnum("reaction_type", ['like', 'dislike']).notNull(),
	reactedAt: timestamp("reacted_at", { mode: 'string' }).default(sql`(now())`),
},
	(table) => [
		primaryKey({ columns: [table.userId, table.postId], name: "post_reactions_user_id_post_id" }),

		foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: "post_reactions_user_id_fkey" }),
		foreignKey({ columns: [table.postId], foreignColumns: [posts.id], name: "post_reactions_post_id_fkey" })
	]);

export const commentsTable = mysqlTable("comments", {
	id: int("id").primaryKey().autoincrement().notNull(),
	postId: int("post_id").notNull(),
	userId: int("user_id").notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "comments_id" }),
		foreignKey({ columns: [table.postId], foreignColumns: [posts.id], name: "comments_post_id_fkey" }),
		foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: "comments_user_id_fkey" })
	]);
