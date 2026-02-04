import { IsEnum } from "class-validator";

export class RespondFriendRequestDto {
  @IsEnum(["accepted", "rejected"])
  status: "accepted" | "rejected";
}