import { useEffect, useRef, useState } from "react";
import { setUserLocation } from './../utils/setUserLocation';
import { generateFood } from "../utils/generateFood";

 export const gridSize = 15;
const initialSnake = [[2, 2]];



const SnakeGame = () => {
  const [snakeBody, setSnakeBody] = useState(initialSnake);
  const [food, setFood] = useState(generateFood(initialSnake));
  const directionRef = useRef([1, 0]);

  const isSnakeBodyDiv = (xc, yc) =>snakeBody.some(([x, y]) => x === xc && y === yc);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnakeBody((prevSnakeBody) => {
        const newHead = [
          prevSnakeBody[0][0] + directionRef.current[0],
          prevSnakeBody[0][1] + directionRef.current[1],
        ];
        console.log("new head,",newHead)

        if (
          newHead[0] < 0 ||
          newHead[0] >= gridSize ||
          newHead[1] < 0 ||
          newHead[1] >= gridSize ||
          prevSnakeBody.some(([x, y]) => newHead[0] === x && newHead[1] === y)
        ) {
          directionRef.current = [1, 0];
          setFood(generateFood(initialSnake));
          return initialSnake;
        }

        let newSnakeBody = [newHead, ...prevSnakeBody];
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(generateFood(newSnakeBody));
        } else {
          newSnakeBody.pop();
        }

        return newSnakeBody;
      });
    }, 200);

    const handleDirection = (e) => {
      const key = e.key;
      if (key === "ArrowUp" && directionRef.current[1] !== 1) {
        directionRef.current = [0, -1];
      } else if (key === "ArrowLeft" && directionRef.current[0] !== 1) {
        directionRef.current = [-1, 0];
      } else if (key === "ArrowRight" && directionRef.current[0] !== -1) {
        directionRef.current = [1, 0];
      } else if (key === "ArrowDown" && directionRef.current[1] !== -1) {
        directionRef.current = [0, 1];
      }
    };

    window.addEventListener("keydown", handleDirection);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleDirection);
    };
  }, [food]);

  useEffect(() => {
    setUserLocation();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className="w-[15rem] h-[15rem] border grid grid-cols-[repeat(15,_1fr)] border-black bg-white rounded-md shadow-md"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/VxSbDsJ/image.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {Array.from({ length: gridSize }, (_, yc) =>
          Array.from({ length: gridSize }, (_, xc) => (
            <div
              key={`${xc}-${yc}`}
              className={` ${
                isSnakeBodyDiv(xc, yc) ? "bg-[#FFD700]" : ""
              } ${
                food[0] === xc && food[1] === yc
                  ? "bg-[#FF4500] rounded-full"
                  : ""
              }`}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
