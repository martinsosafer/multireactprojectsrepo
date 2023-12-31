import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./Constants";

function App() {
  //es necesario poner el local storage adentro del use state si no lo leiria cada vez que se recargar la pagina cuando no lo necesita

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
  });
  const [winner, setWinner] = useState(null); //null no hay ganador , false :empate

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && //miro si hay una x o una o
        boardToCheck[a] === boardToCheck[b] && //si en el 0y 3 esta la x O la x y la o O la o
        boardToCheck[a] === boardToCheck[c]
        //si hay a es igual a b y c hay un ganador
      ) {
        return boardToCheck[a]; //devolvera x u o
      }
    }
    //si no hay ganador
    return null;
  };

  const checkEndGame = (newBoard) => {
    //revisamos si hay empate cuando no hay mas movimientos ni winnercombos
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    //si la posicion ya tiene una ficha elegida
    if (board[index] || winner) return;
    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //guardar partida
    window.localStorage.setItem("board", JSON.stringify(newBoard)); //el local storage solo guarda strings hay que usar
    //guardo turno
    window.localStorage.setItem("turn", JSON.stringify(newTurn));
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //se checkea de nuevo el tablero si no hay ganador empate
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };
  return (
    <>
      <main className="board">
        <h1>Tic tac toe !</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className="game">
          {board.map((cell, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        {winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winner === false ? "Tie" : "Winner:"}</h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Start again</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
