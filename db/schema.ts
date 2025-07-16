import {
  mysqlTable,
  serial,
  bigint,
  int,
  text,
  varchar,
  timestamp,
  mysqlEnum,
  primaryKey,
} from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 250 }).notNull().unique(),
  password: varchar('password', { length: 250 }).notNull(),
});

export const posts = mysqlTable('posts', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number' }) // <--- FONTOS
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
    }),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const postReactions = mysqlTable(
  'post_reactions',
  {
    userId: bigint('user_id', { mode: 'number' }) // <--- FONTOS
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    postId: bigint('post_id', { mode: 'number' }) // ha a `posts.id` is serial
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    reactionType: mysqlEnum('reaction_type', ['like', 'dislike']).notNull(),
    reactedAt: timestamp('reacted_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.postId] }),
  }),
);
