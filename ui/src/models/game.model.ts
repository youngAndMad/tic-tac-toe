export interface Game {
  id: string;
  playerX: string;
  playerO: string | null;
  board: string[];
  currentTurn: string | null;
  status: "WAITING" | "IN_PROGRESS" | "COMPLETED";
  createdDate: string;
}

export type GameEvent = {
  type: "ROOM_CREATED" | "MOVE_MADE";
  payload: any;
};

export type GameFigure = {
  X: string;
  O: string;
};

export type GameFigureLabal = {
  label: string;
  figure: GameFigure;
};

export const defaultFigures: GameFigure = { X: "X", O: "O" };

export const figureOptions: GameFigureLabal[] = [
  { label: "Classic (X & O)", figure: { X: "X", O: "O" } },
  { label: "Fire & Ice", figure: { X: "🔥", O: "❄️" } },
  { label: "Stars & Hearts", figure: { X: "⭐", O: "❤️" } },
  { label: "Cats & Dogs", figure: { X: "🐱", O: "🐶" } },
  { label: "Swords & Shields", figure: { X: "⚔️", O: "🛡️" } },
];

export const boardStyles = {
  default:
    "w-20 h-20 flex items-center justify-center border-2 border-gray-600 text-xl font-bold bg-white",
  dark: "w-20 h-20 flex items-center justify-center border-2 border-gray-800 text-xl font-bold bg-gray-700 text-white",
  neon: "w-20 h-20 flex items-center justify-center border-2 border-pink-500 text-xl font-bold bg-black text-green-400",
  ocean:
    "w-20 h-20 flex items-center justify-center border-2 border-blue-500 text-xl font-bold bg-blue-300 text-white",
  forest:
    "w-20 h-20 flex items-center justify-center border-2 border-green-500 text-xl font-bold bg-green-200 text-brown-700",
};
