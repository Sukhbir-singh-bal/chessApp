import React from 'react';
import { useDrag } from 'react-dnd';

const Piece = ({ piece, pieceImage, position }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'piece',
    item: { piece, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      ref={drag}
      src={pieceImage}
      alt={piece}
      className={`w-12 h-12 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    />
  );
};

export default Piece;
