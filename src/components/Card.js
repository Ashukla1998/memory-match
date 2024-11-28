import React from 'react';

const Card = ({ value, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      {isFlipped ? value : ''}
    </div>
  );
};

export default Card;
