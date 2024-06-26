import React, { useState } from 'react';
import Square from './Square';
import Piece from './Piece';
import rookB from '../assets/pieces/rook-b.svg';
import knightB from '../assets/pieces/knight-b.svg';
import bishopB from '../assets/pieces/bishop-b.svg';
import queenB from '../assets/pieces/queen-b.svg';
import kingB from '../assets/pieces/king-b.svg';
import pawnB from '../assets/pieces/pawn-b.svg';
import rookW from '../assets/pieces/rook-w.svg';
import knightW from '../assets/pieces/knight-w.svg';
import bishopW from '../assets/pieces/bishop-w.svg';
import queenW from '../assets/pieces/queen-w.svg';
import kingW from '../assets/pieces/king-w.svg';
import pawnW from '../assets/pieces/pawn-w.svg';

const initialBoardSetup = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoardSetup);
  const [move,setmove] = useState("white");
  const [blackWins , SetBlackWins] = useState([]);
  const [whiteWins , SetWhiteWins] = useState([]);
  const getPieceImage = (piece) => {
    switch (piece) {
      case 'r': return rookB;
      case 'n': return knightB;
      case 'b': return bishopB;
      case 'q': return queenB;
      case 'k': return kingB;
      case 'p': return pawnB;
      case 'R': return rookW;
      case 'N': return knightW;
      case 'B': return bishopW;
      case 'Q': return queenW;
      case 'K': return kingW;
      case 'P': return pawnW;
      default: return null;
    }
  };

  const handleDrop = (item, toX, toY) => {
    const { piece, position } = item;
    const [fromX, fromY] = position;
    const blackPieces = ['r', 'n', 'b', 'q', 'k', 'b', 'p'];
    const whitePieces = ['R', 'N', 'B', 'Q', 'K', 'B', 'P'];
    const newBoard = board.map(row => row.slice());
    if(isInvalidMove(piece,toX,toY,fromX,fromY,board))return;
    if(blackPieces.includes(newBoard[toX][toY]) && blackPieces.includes(piece) || whitePieces.includes(newBoard[toX][toY]) && whitePieces.includes(piece))return;
      if(blackPieces.includes(piece) && move=="black" || whitePieces.includes(piece) && move=="white"){
        if(move == "black" &&  whitePieces.includes(newBoard[toX][toY])){
            SetBlackWins([...blackWins,newBoard[toX][toY]])
        }
        if(move == "white" &&  blackPieces.includes(newBoard[toX][toY])){
          SetWhiteWins([...whiteWins, newBoard[toX][toY]]);
        }
        newBoard[fromX][fromY] = '';
        newBoard[toX][toY] = piece;
        setBoard(newBoard);    
        setmove(blackPieces.includes(piece) ? "white" : "black")
      }
      
  };

  const renderSquare = (i, j, piece) => {
    const pieceImage = getPieceImage(piece);
    const position = [i, j];
    return (
      <Square key={`${i}-${j}`} x={i} y={j} onDrop={handleDrop}>
        {pieceImage && <Piece piece={piece} pieceImage={pieceImage} position={position} />}
      </Square>
    );
  };

  const renderBoard = () => {
    const squares = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        squares.push(renderSquare(i, j, board[i][j]));
      }
    }
    return squares;
  };

  const isInvalidMove = (piece, toX, toY, fromX, fromY, board) => {
    const dx = Math.abs(toX - fromX);
    const dy = Math.abs(toY - fromY);
    const directionX = toX > fromX ? 1 : -1;
    const directionY = toY > fromY ? 1 : -1;
  
    const checkPath = (startX, startY, endX, endY, isDiagonal) => {
      let x = startX;
      let y = startY;
  
      while (true) {
        if (isDiagonal) {
          x += directionX;
          y += directionY;
        } else {
          if (x !== endX) x += directionX;
          if (y !== endY) y += directionY;
        }
        if (x === endX && y === endY) break;
        if (board[x][y] !== '') {
          return true; // Path is blocked
        }
      }
      return false;
    };
  
    switch (piece.toLowerCase()) {
      case 'p':
        if (piece === 'p') { // Black pawn
          if (fromX === 1 && toX === fromX + 2 && toY === fromY) {
            return checkPath(fromX, fromY, toX, toY, false);
          }
          if (toX === fromX + 1 && toY === fromY && board[toX][toY] === '') return false;
          if (toX === fromX + 1 && Math.abs(toY - fromY) === 1 && board[toX][toY] !== '') return false;
        } else { // White pawn
          if (fromX === 6 && toX === fromX - 2 && toY === fromY) {
            return checkPath(fromX, fromY, toX, toY, false);
          }
          if (toX === fromX - 1 && toY === fromY && board[toX][toY] === '') return false;
          if (toX === fromX - 1 && Math.abs(toY - fromY) === 1 && board[toX][toY] !== '') return false;
        }
        return true;
      case 'r':
        if (dx !== 0 && dy !== 0) return true; // Invalid move if not in a straight line
        return checkPath(fromX, fromY, toX, toY, false);
      case 'n':
        return !(dx === 2 && dy === 1 || dx === 1 && dy === 2);
      case 'b':
        if (dx !== dy) return true; // Invalid move if not diagonal
        return checkPath(fromX, fromY, toX, toY, true);
      case 'q':
        if (dx === dy) return checkPath(fromX, fromY, toX, toY, true);
        if (dx === 0 || dy === 0) return checkPath(fromX, fromY, toX, toY, false);
        return true; // Invalid move if not straight line or diagonal
      case 'k':
        return dx > 1 || dy > 1;
      default:
        return true;
    }
  };
  
  
  
  return (
    <div className='flex justify-center align-top'>
    <h2 className=''>{move}</h2>
    <div className="grid grid-cols-8 gap-0">
      {renderBoard()}
    </div>
    <div className="flex flex-col justify-between">
      <div className="p-2 w-100">
        Black Wins
        <div className="flex flex-wrap">
        {blackWins.map((item,index)=>(
                <div key={index}><img className='w-10 h-10' src={getPieceImage(item)} alt="item"  /></div>
        ))}
        </div>
      </div>
      <div className="p-2 w-100">
        White Wins
        <div className="flex flex-wrap">
        {
          whiteWins.map((item, index) => (
            <div key={index}><img className='w-10 h-10' src={getPieceImage(item)} alt="item"  /></div>
          ))
        }
        </div>
    
      </div>
    </div>
    </div>
    
  );
};

export default ChessBoard;