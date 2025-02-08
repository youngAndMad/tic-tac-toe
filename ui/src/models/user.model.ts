export type User = {
  id: string;
  username: string;
  online: boolean;
};

export type UserDto = {
  user: User;
  isInGame: boolean;
  friendshipStatus: FriendshipStatus;
};

export type UsersCount = {
  count: number;
};

export enum FriendshipStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  NONE = "NONE",
}
