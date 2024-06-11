import React from 'react';
import { useDrop } from 'react-dnd';

const Square = ({ children, x, y, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'piece',
    drop: (item) => onDrop(item, x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const isBlack = (x + y) % 2 === 1;
  const backgroundColor = isBlack ? 'bg-green-700' : 'bg-lime-200';
  const highlight = isOver ? 'bg-green-500' : '';

  return (
    <div
      ref={drop}
      className={`w-16 h-16 flex justify-center items-center ${backgroundColor} ${highlight}`}
    >
      {children}
    </div>
  );
};

export default Square;
