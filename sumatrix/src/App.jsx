import React, { useState } from "react";
import GridCell from "./components/GridCell";
import NoteBox from "./components/NoteBox";
import PossibilityBoard from "./components/PossibilityBoard";


const generateRandomGrid = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffled = numbers.sort(() => 0.5 - Math.random());
  return Array.from({ length: 3 }, (_, row) =>
    Array.from({ length: 3 }, (_, col) => shuffled[row * 3 + col])
  );
};

const App = () => {
  const [solutionGrid, setSolutionGrid] = useState(generateRandomGrid);
  const [userGrid, setUserGrid] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(""))
  );
  const [isCorrect, setIsCorrect] = useState(null);

  const cellLabels = [
    ["A", "B", "C"],
    ["D", "E", "F"],
    ["G", "H", "I"]
  ];

  const getRowSums = () =>
    solutionGrid.map((row) => row.reduce((acc, n) => acc + n, 0));

  const getColSums = () =>
    [0, 1, 2].map((col) =>
      solutionGrid.map((row) => row[col]).reduce((acc, n) => acc + n, 0)
    );

  const getDiagonalSums = () => {
    const main = solutionGrid[0][0] + solutionGrid[1][1] + solutionGrid[2][2];
    const anti = solutionGrid[0][2] + solutionGrid[1][1] + solutionGrid[2][0];
    return [main, anti];
  };

  const handleInputChange = (row, col, value) => {
    const updated = [...userGrid];
    updated[row][col] = value;
    setUserGrid(updated);
  };

  const checkSolution = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (parseInt(userGrid[i][j]) !== solutionGrid[i][j]) {
          setIsCorrect(false);
          return;
        }
      }
    }
    setIsCorrect(true);
  };

  const rowSums = getRowSums();
  const colSums = getColSums();
  const [diag1, diag2] = getDiagonalSums();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-white to-purple-100 font-math p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-800 mb-10 drop-shadow-md">
        🧠 SUMATRIX
      </h1>

      <div className="flex flex-col md:flex-row items-start justify-center gap-12 max-w-7xl mx-auto">
        {/* Tablero */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border-4 border-purple-300 relative overflow-hidden">
          {/* Fondo decorativo */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 opacity-60 rounded-2xl"></div>
            <div className="absolute top-4 left-4 w-16 h-16 bg-pink-200 rounded-full blur-2xl opacity-40"></div>
            <div className="absolute bottom-6 right-8 w-20 h-20 bg-yellow-200 rounded-full blur-2xl opacity-30"></div>
          </div>
          <div className="relative z-10 grid grid-cols-4 gap-4">
            {userGrid.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((value, colIndex) => (
                  <div className="flex items-center justify-center">
                    <GridCell
                      key={`${rowIndex}-${colIndex}`}
                      value={value}
                      onChange={(val) =>
                        handleInputChange(rowIndex, colIndex, val)
                      }
                      label={cellLabels[rowIndex][colIndex]}
                    />
                  </div>
                ))}
                <div className="flex items-center justify-center text-md font-bold text-purple-700 bg-purple-200 rounded-xl px-3 py-2 shadow-inner border-2 border-purple-300 animate-bounce-slow">
                  Σ = {rowSums[rowIndex]}
                </div>
              </React.Fragment>
            ))}
            {/* Column Hints */}
            {[0, 1, 2].map((col) => (
              <div
                key={`col-${col}`}
                className="text-center text-purple-700 font-bold pt-3 bg-yellow-100 rounded-xl shadow-inner border-2 border-yellow-300"
              >
                <span className="text-xl">⬇</span>
                <br />
                <span className="text-lg">Σ = {colSums[col]}</span>
              </div>
            ))}
            <div></div> {/* Empty bottom-right cell */}
          </div>

          
          <div className="relative mt-6 flex justify-center gap-2">
            <div className="flex items-center gap-2 bg-pink-100 border-2 border-pink-300 rounded-xl px-5 py-3 shadow-inner font-bold text-pink-700 text-lg">
              <span className="text-2xl">↘</span>
              <span className="text-md"></span>
              <span className="bg-white rounded-lg px-3 py-1 shadow text-pink-700 font-extrabold text-xl">Σ = {diag1}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 border-2 border-blue-300 rounded-xl px-5 py-3 shadow-inner font-bold text-blue-700 text-lg">
              <span className="text-2xl">↙</span>
              <span className="text-md"></span>
              <span className="bg-white rounded-lg px-3 py-1 shadow text-blue-700 font-extrabold text-xl">Σ = {diag2}</span>
            </div>
          </div>

          {/* Botón de comprobación y resultado */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={checkSolution}
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 border-2 border-green-600"
            >
              🎲 Comprobar solución
            </button>

            {isCorrect === true && (
              <p className="text-green-700 font-bold text-xl animate-bounce">
                ✅ ¡Correcto! Has resuelto el Sumatrix. 🎉
              </p>
            )}
            {isCorrect === false && (
              <p className="text-red-600 font-bold text-xl animate-shake">
                ❌ Aún hay errores. Revisa los valores.
              </p>
            )}
          </div>
        </div>

        {/* Área de anotaciones */}
        <NoteBox />
        {/* Área de posibilidades */}
        <PossibilityBoard />
      </div>
    </div>
  );
};

export default App;



