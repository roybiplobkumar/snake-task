import { gridSize } from "../components/SnakeGame";

export const generateFood = (snakeBody) => {
  let food;
  do {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    food = [x, y];
  } while (snakeBody.some(([sx, sy]) => sx === food[0] && sy === food[1]));
  return food;
};