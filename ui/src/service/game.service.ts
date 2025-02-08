import axios from "axios";
import { Game } from "../models/game.model";

class GameService {
  async createOrJoinRoom(): Promise<Game> {
    const createOrJoinRoomResponse = await axios.post<Game>("/api/v1/game");
    return createOrJoinRoomResponse.data;
  }
}

export const gameService = new GameService();
