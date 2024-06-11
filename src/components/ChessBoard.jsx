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
    if(blackPieces.includes(newBoard[toX][toY]) && blackPieces.includes(piece) || whitePieces.includes(newBoard[toX][toY]) && whitePieces.includes(piece)){
      console.log("Invalid Move");
    }else{
      newBoard[fromX][fromY] = '';
      newBoard[toX][toY] = piece;
      setBoard(newBoard);
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

  return (
    <div className="grid grid-cols-8 gap-0">
      {renderBoard()}
    </div>
  );
};

export default ChessBoard;