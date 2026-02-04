import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { and, eq, or, sql } from 'drizzle-orm';
import { friendsTable, users } from 'db/schema';
import { baseFriendsQueryGet, countquery } from 'src/utils';
import { use } from 'passport';

@Injectable()
export class FriendsService {

  async sendRequestService(senderId: number, receiverId: number) {
    if (senderId === receiverId) {
      throw new Error("Nem küldhetsz magadnak barátkérést");
    }
    const existing = await db.select().from(friendsTable).where(
      and(
        eq(friendsTable.senderId, senderId),
        eq(friendsTable.receiverId, receiverId),
        eq(friendsTable.status, "pending")
      ));
    if (existing.length > 0) {
      throw new Error("Már létezik egy függőben lévő barátkérés ehhez a felhasználóhoz");
    }

    await db.insert(friendsTable).values({
      senderId: senderId,
      receiverId: receiverId,
    });
    return { message: "Barátkérés sikeresen elküldve" };
  };

  async respondService(requestId: number, userId: number, status: "accepted" | "rejected") {
    const rows = await db.select().from(friendsTable).where(
      and(
        eq(friendsTable.id, requestId),
        eq(friendsTable.receiverId, userId)
      )
    );
    if (rows.length === 0) {
      throw new Error('Nincs ilyen barátkérés vagy nincs jogosultságod válaszolni');
    }
    const req = rows[0];
    if (req.status !== 'pending') {
      throw new Error('A barátkérés már válaszolt');
    }

    await db.update(friendsTable).set({ status }).where(eq(friendsTable.id, requestId));
    return { message: `Kérelem ${status}-ként feldolgozva` };
  }

  async getPendingRequests(userId: number) {
    const rows = await db.select().from(friendsTable).where(
      and(eq(friendsTable.receiverId, userId), eq(friendsTable.status, 'pending'))
    );
    return rows;
  }

  async getSentRequests(userId: number) {
    const rows = await db.select().from(friendsTable).where(
      and(eq(friendsTable.senderId, userId), eq(friendsTable.status, 'pending'))
    );
    return rows;
  }

  async getFriendsList(userId: number) {
    const friends = await baseFriendsQueryGet(userId);

    const friendsList = await db.select({
      id: users.id,
      name: users.name,
      //profilePicture: users.profilePicture,
    }).from(users).where(
      or(
        ...friends.map(friend => eq(users.id, friend.friendId))
      )
    );

    return friendsList;
  }

  async FollowerCount(userId: number) {
    const res = await db
      .select({
        count: sql<number>`COUNT(*)`
      })
      .from(friendsTable)
      .where(
        and(
          eq(friendsTable.status, "accepted"),
          or(
            eq(friendsTable.senderId, userId),
            eq(friendsTable.receiverId, userId)
          )
        )
      );

    return res[0]?.count ?? 0;
  }





}
