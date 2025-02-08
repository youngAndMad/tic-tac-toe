export type User = {
  id: string;
  username: string;
  online: boolean;
};

export type UserDto = {
  user: User;
  isInGame: boolean;
};

export type UsersCount = {
  count: number;
};
