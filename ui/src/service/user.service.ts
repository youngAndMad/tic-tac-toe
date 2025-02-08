import axios from "axios";
import { User, UserDto, UsersCount } from "../models/user.model";

class UserService {
  async me(): Promise<User> {
    try {
      const meResponse = await axios.get<User>("/api/v1/users/me");
      return meResponse.data;
    } catch (e) {
      window.location.href = "/oauth2/authorization/github";
      return null!!;
    }
  }

  async getFriends(): Promise<UserDto[]> {
    const meResponse = await axios.get<UserDto[]>("/api/v1/user-friendships");
    return meResponse.data;
  }

  async uploadAvatar(file: File): Promise<unknown> {
    const formData = new FormData();
    formData.append("image", file);
    const uploadImageResponse = await axios.post<unknown>(
      "/api/v1/users/avatar",
      formData
    );
    return uploadImageResponse.data;
  }

  async downloadAvatar(userId: string): Promise<Blob> {
    const response = await axios.get<Blob>(`/api/v1/users/avatar/${userId}`, {
      responseType: "blob",
    });
    return response.data;
  }

  async onlineUsersCount(): Promise<UsersCount> {
    const meResponse = await axios.get<UsersCount>("/api/v1/users/online");
    return meResponse.data;
  }

  async filterUsers(query: string): Promise<UserDto[]> {
    const response = await axios.get<UserDto[]>(
      `/api/v1/users/filter?keyword=${query}`
    );
    return response.data;
  }
}

export const userService = new UserService();
