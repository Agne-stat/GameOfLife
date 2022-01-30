import React, {useState} from 'react';
import './Game.css';


const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const rows = HEIGHT / CELL_SIZE;
const cols = WIDTH / CELL_SIZE;

const Cell = (x,y) => {
        return (
            <div className="Cell" style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }} />
        );
}


const Game3 = () => {
    const [cells, setCells] = useState([0,0]);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInterval] = useState(100);
    const [board, setBoard] = useState([]);
    // const [x, setX] = useState(0)
    // const [y, setY] = useState(0)
    const operations = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    // const boardRef = useRef(null)



    const makeEmptyBoard = () =>{
        let board = [];
        for (let y = 0; y < rows; y++) {
            board[y] = [];
            for (let x = 0; x < cols; x++) {
                board[y][x] = false;
            }
        }

        return setBoard(board);
    }

    // const getElementOffset = () =>{
    //     const rect = boardRef.getBoundingClientRect();
    //     setX(rect.x);
    //     setY(rect.y);
    // };


    const makeCells = () =>{
        let cells = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }

    const handleClick = () => {
        setIsRunning(!isRunning)
        if (isRunning) {
          handleRandom()
          runGame()
        } else {
          stopGame()
        } 
    }

    const runGame = () => {
        setIsRunning(true)
        runIteration();
    }

    const stopGame = () => {
        setIsRunning(false)

        // if (timeoutHandler) {
        //     window.clearTimeout(timeoutHandler);
        //     timeoutHandler = null;
        // }

    }

    const runIteration = () => {
        let newBoard = makeEmptyBoard();

        for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let neighbors = calculateNeighbors(board, x, y);

            if (board[y][x]) {
                if (neighbors === 2 || neighbors === 3) {
                  newBoard[y][x] = true;
                } else {
                  newBoard[y][x] = false;
                }
            } else {
                if (!board[y][x] && neighbors === 3) {
                  newBoard[y][x] = true;
                }
            }
        }
        setBoard(newBoard)
        const cells = () => makeCells()
        setCells(cells)

        const timeoutHandler = window.setTimeout(() => {
            runIteration();
    }, interval);
    }
}
    


    const calculateNeighbors=(board, x, y) =>{
        let neighbors = 0;
        for (let i = 0; i < operations.length; i++) {
          let y1 = y + operations[i][0];
          let x1 = x + operations[i][1];
    
          if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows ) {
            neighbors += board[y1][x1];
          }
        }
        return neighbors;
    }

    const handleIntervalChange = (e) => {
        setInterval(e.target.value)
    }

    const handleClear = () => {
        const board = () => makeEmptyBoard();
        const cells = () => makeCells()
        setCells(cells)
    }

    const handleRandom = () => {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                board[y][x] = (Math.random() >= 0.5);
                setCells(board[y][x])
            }
        }

        const cells = () => makeCells()
       
    }
    
    console.log(cells);
    return (
        <div>
            <div className="Board"
                style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                onClick={handleClick}>
                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                ))}
            </div>
    
            <div className="controls">
                Update every <input value={interval} onChange={handleIntervalChange} /> msec
                {isRunning ?
                    <button className="button" onClick={stopGame}>Stop</button> :
                    <button className="button" onClick={runGame}>Run</button>
                }
                <button className="button" onClick={handleRandom}>Random</button>
                <button className="button" onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
    
}

export default Game3;

