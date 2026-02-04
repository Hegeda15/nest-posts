import { IsInt } from "class-validator";

export class SendFriendRequestDto {
  @IsInt()
  receiverId: number;
}