import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, mysqlEnum, timestamp, unique, serial, text, varchar, uniqueIndex } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"
import { foreignKey } from "drizzle-orm/mysql-core";
import { boolean } from "drizzle-orm/mysql-core";
import { tinyint } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: int("id").primaryKey().autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 250 }).notNull(),
	password: varchar({ length: 250 }).notNull(),
	isPrivate: boolean("is_private").notNull().default(false),
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


		foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: "posts_user_id_fkey" })
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

export const savedPostsTable = mysqlTable("saved_posts", {
	id: int("id").autoincrement().notNull().primaryKey(),
	userId: int("user_id").notNull(),
	postId: int("post_id").notNull(),
	isSaved: tinyint("is_saved")
		.notNull()
		.default(1),
	savedAt: timestamp("saved_at", { mode: "string" }).default(sql`now()`),
}, (table) => ({
	userFk: foreignKey({
		columns: [table.userId],
		foreignColumns: [users.id],
		name: "saved_posts_user_id_fkey",
	}),
	postFk: foreignKey({
		columns: [table.postId],
		foreignColumns: [posts.id],
		name: "saved_posts_post_id_fkey",
	}),
	userPostUnique: uniqueIndex("saved_posts_user_post_unique")
		.on(table.userId, table.postId),

}));
export const friendsTable = mysqlTable(
  "friend_requests",
  {
    id: int("id").primaryKey().autoincrement(),

    senderId: int("sender_id").notNull(),
    receiverId: int("receiver_id").notNull(),

    status: mysqlEnum("status", ["pending", "accepted", "rejected"])
      .default("pending")
      .notNull(),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    senderFk: foreignKey({
      columns: [table.senderId],
      foreignColumns: [users.id],
    }),
    receiverFk: foreignKey({
      columns: [table.receiverId],
      foreignColumns: [users.id],
    }),
	 uniqueReq: uniqueIndex("follow_req_unique")
      .on(table.senderId, table.receiverId),
  })
);

export const followsTable = mysqlTable(
  "follows",
  {
    followerId: int("follower_id").notNull(),
    followingId: int("following_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.followerId, table.followingId] }),
    followerFk: foreignKey({
      columns: [table.followerId],
      foreignColumns: [users.id],
    }),
    followingFk: foreignKey({
      columns: [table.followingId],
      foreignColumns: [users.id],
    }),
  })
);

