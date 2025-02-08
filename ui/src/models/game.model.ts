export interface Game {
  id: string;
  playerX: string;
  playerO: string | null;
  board: string[][];
  currentTurn: string | null;
  status: "WAITING" | "IN_PROGRESS" | "COMPLETED";
  createdDate: string;
}
