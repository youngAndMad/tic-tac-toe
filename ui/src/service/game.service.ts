import axios from "axios";

class GameService {
  async createOrJoinRoom(): Promise<unknown> {
    const createOrJoinRoomResponse = await axios.post<unknown>("/api/v1/game");
    return createOrJoinRoomResponse.data;
  }
}

export const gameService = new GameService();
