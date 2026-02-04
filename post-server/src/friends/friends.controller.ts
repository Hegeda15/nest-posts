import { Controller, Get, Post, Body, Patch, Param, BadRequestException, Req, Delete, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { SendFriendRequestDto, RespondFriendRequestDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post(":id/follow")
  follow(
    @Param("id") targetId: number,
    @Req() req: Request
  ) {
    const user = req.user as any;
    return this.friendsService.followUser(user.sub, +targetId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(":id/unfollow")
  unfollow(
    @Param("id") targetId: number,
    @Req() req: Request
  ) {
    const user = req.user as any;
    return this.friendsService.unfollowUser(user.sub, +targetId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("requests/:id/accept")
  acceptFollowRequest(
    @Param("id") requestId: number,
    @Req() req: Request
  ) {
    const user = req.user as any;
    return this.friendsService.acceptFollowRequest(+requestId, user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("requests/:id/reject")
  rejectFollowRequest(
    @Param("id") requestId: number,
    @Req() req: Request
  ) {
    const user = req.user as any;
    return this.friendsService.rejectFollowRequest(+requestId, user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch("requests/:id/respond")
  respondFollowRequest(
    @Param("id") requestId: number,
    @Body() dto: RespondFriendRequestDto,
    @Req() req: Request
  ) {
    const user = req.user as any;
    return this.friendsService.respondFollowrequest(+requestId, user.sub, dto.status);
  }

  @Get(":id/followers/count")
  getFollowerCount(@Param("id") userId: number) {
    return this.friendsService.getFollowerCount(+userId);
  }

  @Get(":id/following/count")
  getFollowingCount(@Param("id") userId: number) {
    return this.friendsService.getFollowingCount(+userId);
  }

  @Get(":id/followers")
  getFollowers(@Param("id") userId: number) {
    return this.friendsService.getFollowers(+userId);
  }

  @Get(":id/following")
  getFollowing(@Param("id") userId: number) {
    return this.friendsService.getFollowing(+userId);
  }
}
