import { Controller, Get, Post, Body, Patch, Param, BadRequestException } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { SendFriendRequestDto, RespondFriendRequestDto } from './dto';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('send')
  async sendRequest(@Body() body: SendFriendRequestDto & { senderId?: number }) {
    const senderId = body['senderId'];
    if (!senderId) throw new BadRequestException('senderId is required in body');
    return this.friendsService.sendRequestService(senderId, body.receiverId);
  }

  @Patch(':id/respond')
  async respond(
    @Param('id') id: string,
    @Body() body: RespondFriendRequestDto & { userId?: number },
  ) {
    const userId = body['userId'];
    if (!userId) throw new BadRequestException('userId is required in body');
    return this.friendsService.respondService(+id, userId, body.status);
  }

  @Get('pending/:userId')
  async getPending(@Param('userId') userId: string) {
    return this.friendsService.getPendingRequests(+userId);
  }

  @Get('sent/:userId')
  async getSent(@Param('userId') userId: string) {
    return this.friendsService.getSentRequests(+userId);
  }

  @Get('list/:userId')
  async getFriends(@Param('userId') userId: string) {
    return this.friendsService.getFriendsList(+userId);
  }
  @Get('count/:userId')
  async getFollowerCount(@Param('userId') userId: string) {
    return this.friendsService.FollowerCount(+userId);
  }
}
