import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { and, eq, or, sql } from 'drizzle-orm';
import { friendsTable as followRequestsTable, followsTable, users } from 'db/schema';
import { baseFriendsQueryGet, countquery } from 'src/utils';
import { use } from 'passport';

@Injectable()
export class FriendsService {


  async followUser(followerId: number, targetId: number) {
    if (followerId === targetId) {
      throw new Error("Nem követheted magad");
    }
    const existing = await db.select().from(followsTable).where(
      and(
        eq(followsTable.followerId, followerId),
        eq(followsTable.followingId, targetId)
      ));
    if (existing.length > 0) {
      throw new Error("Már követed ezt a felhasználót");
    }
    const [target] = await db.select({ isPrivate: users.isPrivate })
      .from(users)
      .where(eq(users.id, targetId));

    if (!target) {
      throw new Error("Nincs ilyen felhasználó");
    }


    //Ha public azonnali követés
    if (!target.isPrivate) {
      await db.insert(followsTable).values({
        followerId,
        followingId: targetId,
      });
      return { message: "Sikeresen követted a felhasználót" };
    }
    //ha private akkor follow requestet küldünk
    const existingReq = await db.select()
      .from(followRequestsTable)
      .where(and(
        eq(followRequestsTable.senderId, followerId),
        eq(followRequestsTable.receiverId, targetId)
      ));
    if (existingReq.length > 0) {
      throw new Error("Már létezik egy függőben lévő követési kérelem ehhez a felhasználóhoz");
    }

    await db.insert(followRequestsTable).values({
      senderId: followerId,
      receiverId: targetId,
    });
    return { message: "Követési kérelem sikeresen elküldve" };

  }

  async unfollowUser(followerId: number, targetId: number) {
    await db
    .delete(followsTable)
    .where(
      and(
        eq(followsTable.followerId, followerId),
        eq(followsTable.followingId, targetId)
      )
    );
    return { message: "Sikeresen leállítottad a követést" };
  }

  async acceptFollowRequest(requestId: number, userId: number) {
    const rows = await db.select()
      .from(followRequestsTable)
      .where(and(
        eq(followRequestsTable.id, requestId),
        eq(followRequestsTable.receiverId, userId)
      ));
    if (rows.length === 0) {
      throw new Error('Nincs ilyen követési kérelem vagy nincs jogosultságod elfogadni');
    }
    const req = rows[0];
    await db.insert(followsTable).values({
      followerId: req.senderId,
      followingId: req.receiverId,
    });

    await db.delete(followRequestsTable)
      .where(eq(followRequestsTable.id, requestId));

    return { message: "Kérelem elfogadva" };
  }

  async rejectFollowRequest(requestId: number, userId: number) {
    await db.delete(followRequestsTable)
      .where(and(
        eq(followRequestsTable.id, requestId),
        eq(followRequestsTable.receiverId, userId)
      ));
      return { message: "Kérelem elutasítva" };
  }

  async respondFollowrequest(
    requestId: number,
    userId: number,
    status: "accepted" | "rejected"
  ) {
    const rows = await db.select()
      .from(followRequestsTable)
      .where(and(
        eq(followRequestsTable.id, requestId),
        eq(followRequestsTable.receiverId, userId)
      ))
    if (rows.length === 0) {
      throw new Error('Nincs ilyen barátkérés vagy nincs jogosultságod válaszolni');
    }
    const req = rows[0];
    if (status === 'accepted') {
      await db.insert(followsTable).values({
        followerId: req.senderId,
        followingId: req.receiverId,
      })
    }

    await db.delete(followRequestsTable)
      .where(eq(followRequestsTable.id, requestId));

    return { message: `Kérelem ${status}-ként feldolgozva` };
  }

  //hányan követője van egy usernek
  async getFollowerCount(userId: number) {
    const res = await db.select({
      count: sql<number>`COUNT(*)`
    })
      .from(followsTable)
      .where(eq(followsTable.followingId, userId));
    return res[0]?.count ?? 0;
  }

  // hány embert követ egy user
  async getFollowingCount(userId: number) {
    const res = await db.select({
      count: sql<number>`COUNT(*)`
    })
      .from(followsTable)
      .where(eq(followsTable.followerId, userId));
    return res[0]?.count ?? 0;
  }
  //kik követik egy usert
  async getFollowers(userId: number) {
    return db.select({
      id: users.id,
      name: users.name,
    })
      .from(followsTable)
      .innerJoin(users, eq(followsTable.followerId, users.id))
      .where(eq(followsTable.followingId, userId));
  }
  //kit követ egy user
  async getFollowing(userId: number) {
    return db.select({
      id: users.id,
      name: users.name,
    })
      .from(followsTable)
      .innerJoin(users, eq(followsTable.followingId, users.id))
      .where(eq(followsTable.followerId, userId));
  }

}
