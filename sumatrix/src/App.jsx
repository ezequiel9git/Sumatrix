import React, { useState } from "react";
import GridCell from "./components/GridCell";
import NoteBox from "./components/NoteBox";

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
        🧠 Sumatrix
      </h1>

      <div className="flex flex-col md:flex-row items-start justify-center gap-12 max-w-7xl mx-auto">
        {/* Tablero */}
        <div className="bg-white shadow-xl rounded-xl p-6 border-2 border-purple-300">
          <div className="grid grid-cols-4 gap-3">
            {userGrid.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((value, colIndex) => (
                  <GridCell
                    key={`${rowIndex}-${colIndex}`}
                    value={value}
                    onChange={(val) =>
                      handleInputChange(rowIndex, colIndex, val)
                    }
                    label={cellLabels[rowIndex][colIndex]}
                  />
                ))}
                <div className="flex items-center justify-center text-md font-bold text-purple-600 bg-purple-100 rounded-md px-2 py-1">
                  Σ = {rowSums[rowIndex]}
                </div>
              </React.Fragment>
            ))}
            {/* Column Hints */}
            {[0, 1, 2].map((col) => (
              <div
                key={`col-${col}`}
                className="text-center text-purple-700 font-semibold pt-2"
              >
                ⬇<br />
                Σ = {colSums[col]}
              </div>
            ))}
            <div></div> {/* Empty bottom-right cell */}
          </div>

          <div className="mt-4 text-sm text-center text-indigo-700 font-semibold">
            Diagonal ↘ Σ = {diag1} &nbsp;&nbsp;|&nbsp;&nbsp; Diagonal ↙ Σ = {diag2}
          </div>

          {/* Botón de comprobación y resultado */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              onClick={checkSolution}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md shadow-md transition"
            >
              Comprobar solución
            </button>

            {isCorrect === true && (
              <p className="text-green-700 font-semibold text-lg">
                ✅ ¡Correcto! Has resuelto el Sumatrix. 🎉
              </p>
            )}
            {isCorrect === false && (
              <p className="text-red-600 font-semibold text-lg">
                ❌ Aún hay errores. Revisa los valores.
              </p>
            )}
          </div>
        </div>

        {/* Área de anotaciones */}
        <NoteBox />
      </div>
    </div>
  );
};

export default App;



