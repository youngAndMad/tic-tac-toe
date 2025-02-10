import axios from "axios";
import { Game } from "../models/game.model";

class GameService {
  async createOrJoinRoom(): Promise<Game> {
    const createOrJoinRoomResponse = await axios.post<Game>("/api/v1/game");
    return createOrJoinRoomResponse.data;
  }

  async findRoom(id: string): Promise<Game> {
    const findRoomResponse = await axios.get<Game>(`/api/v1/game/${id}`);
    return findRoomResponse.data;
  }

  calculateWinner = (squares: Array<string | null>) => {
    if (!squares) return null;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  async makeMove(roomId: string, index: number): Promise<Game> {
    const makeMoveResponse = await axios.post<Game>(
      `/api/v1/game/${roomId}/move?idx=${index}`
    );
    return makeMoveResponse.data;
  }
}

export const gameService = new GameService();
