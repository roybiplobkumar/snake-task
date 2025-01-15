import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const gridSize = 15 ;
const gameGrid=Array.from({length:gridSize}, ()=> new Array(gridSize).fill("")) ;
console.log(gameGrid)
const initalSnak = [[5, 5]];
const generateFood = () => {
  const x = Math.floor(Math.random() * gridSize);
  const y = Math.floor(Math.random() * gridSize);
  return [x, y];
};


const SnakeGame = () => {
  const [snakeBody, setSnakeBody] = useState(initalSnak);
  const directionRef = useRef([1, 0]);
  const foodRef = useRef(generateFood());
  const isSnakeBodyDiv = (xy, yc) => {
    return snakeBody.some(([x, y]) => {
      return x === xy && y === yc;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnakeBody((prevSnakeBody) => {
        const newHead = [
          prevSnakeBody[0][0] + directionRef.current[0],
          prevSnakeBody[0][1] + directionRef.current[1],
        ];

        if (
          newHead[0] < 0 ||
          newHead[0] >= gridSize ||
          newHead[1] < 0 ||
          newHead[1] >= gridSize ||
          prevSnakeBody.some(([x, y]) => {
            return newHead[0] === x && newHead[1] === y;
          })
        ) {
          directionRef.current = [1, 0];
          return initalSnak;
        }
        const copySnakeBody = prevSnakeBody.map((arr) => [...arr]);
        if (
          newHead[0] === foodRef.current[0] &&
          newHead[1] === foodRef.current[1]
        ) {
          foodRef.current = generateFood();
        } else {
          copySnakeBody.pop();
        }

        copySnakeBody.unshift(newHead);
        return copySnakeBody;
      });
    }, 100);

    const handleDirection = (e) => {
      const key = e.key;
      console.log(key);
      if (key === "ArrowUp" && directionRef.current[1] != 1) {
        directionRef.current = [0, -1];
      } else if (key === "ArrowLeft" && directionRef.current[0] != 1) {
        directionRef.current = [-1, 0];
      } else if (key === "ArrowRight" && directionRef.current[0] != -1) {
        directionRef.current = [1, 0];
      } else if (key === "ArrowDown" && directionRef.current[1] != -1) {
        directionRef.current = [0, 1];
      }
    };

    window.addEventListener("keydown", handleDirection);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleDirection);
    };
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[15rem] h-[15rem] border-2 grid grid-cols-[repeat(15,_1fr)] border-black bg-white rounded-md shadow-md">

        {gameGrid.map((row,yc)=>{
          return row.map((cell, xc)=>{
            return (
              <div key={cell}
                className={`cell ${isSnakeBodyDiv(xc, yc) ? "bg-green-500" : ""}
                ${
                  foodRef.current[0] === xc && foodRef.current[1] === yc
                    ? "bg-red-500 rounded-full"
                    : ""
                }`}
              ></div>
            );
          })
        })}
       
      </div>
    </div>
  );
};

export default SnakeGame;
