import React, { useState, useEffect } from "react";
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

  const rowSums = getRowSums();
  const colSums = getColSums();
  const [diag1, diag2] = getDiagonalSums();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-gray-800">🎯 Sumatrix</h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Grid + Row Hints */}
        <div>
          <div className="grid grid-cols-4 gap-2">
            {userGrid.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((value, colIndex) => (
                  <GridCell
                    key={`${rowIndex}-${colIndex}`}
                    value={value}
                    onChange={(val) =>
                      handleInputChange(rowIndex, colIndex, val)
                    }
                  />
                ))}
                <div className="flex items-center justify-center font-bold text-blue-600">
                  = {rowSums[rowIndex]}
                </div>
              </React.Fragment>
            ))}
            {/* Column Hints */}
            {[0, 1, 2].map((col) => (
              <div
                key={`col-${col}`}
                className="text-center font-bold text-blue-600"
              >
                ↓<br />{colSums[col]}
              </div>
            ))}
            <div></div> {/* empty bottom-right */}
          </div>
          {/* Diagonal Hints */}
          <div className="mt-2 text-sm text-center text-purple-700 font-semibold">
            Diagonal ↘ = {diag1} | Diagonal ↙ = {diag2}
          </div>
        </div>

        {/* Notes */}
        <NoteBox />
      </div>
    </div>
  );
};

export default App;
