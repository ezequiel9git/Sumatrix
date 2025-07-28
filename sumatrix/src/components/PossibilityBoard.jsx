import React, { useState } from "react";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PossibilityBoard = () => {
  const initialState = {};
  letters.forEach((letter) => {
    initialState[letter] = {};
    numbers.forEach((num) => {
      initialState[letter][num] = true; // true = posible (verde)
    });
  });

  const [possibilities, setPossibilities] = useState(initialState);

  const toggleNumber = (letter, num) => {
    setPossibilities((prev) => ({
      ...prev,
      [letter]: {
        ...prev[letter],
        [num]: !prev[letter][num], // alternar entre true y false
      },
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-300 max-w-md w-full">
      <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">🎯 Posibilidades por letra</h2>
      <div className="space-y-2">
        {letters.map((letter) => (
          <div key={letter}>
            <div className="font-semibold text-purple-600 mb-1">{letter}:</div>
            <div className="flex flex-wrap gap-2">
              {numbers.map((num) => (
                <button
                  key={num}
                  onClick={() => toggleNumber(letter, num)}
                  className={`w-8 h-8 text-sm font-bold rounded-md text-white transition ${
                    possibilities[letter][num]
                      ? "bg-green-400 hover:bg-green-500"
                      : "bg-red-400 hover:bg-red-500"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PossibilityBoard;
