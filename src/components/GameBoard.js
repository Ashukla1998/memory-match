import React, { useState, useEffect } from 'react';
import Card from './Card';
import Notification from './Notification';

const GameBoard = ({ level }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gridConfig, setGridConfig] = useState({ rows: 2, cols: 2 });
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  useEffect(() => {
    const gridConfigs = {
      1: { rows: 2, cols: 2, time: 20 },
      2: { rows: 2, cols: 3, time: 30 },
      3: { rows: 3, cols: 3, time: 40 },
      4: { rows: 3, cols: 4, time: 50 },
      5: { rows: 4, cols: 4, time: 60 },
    };

    const { rows, cols, time } = gridConfigs[level];
    setGridConfig({ rows, cols });
    setTimer(time);
    setMoves(0);
    setMatchedCards([]);
    setFlippedCards([]);
    setIsGameOver(false);
    setIsGameStarted(false);

    const totalPairs = (rows * cols) / 2;
    const cardData = [];
    for (let i = 1; i <= totalPairs; i++) {
      cardData.push(i, i);
    }
    setCards(shuffleArray(cardData));
  }, [level]);

  useEffect(() => {
    if (isGameStarted && timer > 0 && !isGameOver) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && isGameStarted && !isGameOver) {
      setIsGameOver(true);
      showNotification("⏰ Time's Up!", "error");
    }
  }, [timer, isGameStarted, isGameOver]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (index) => {
    if (!isGameStarted || flippedCards.length >= 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      setMoves((prev) => prev + 1);
      const [firstIndex] = flippedCards;

      if (cards[firstIndex] === cards[index]) {
        setMatchedCards([...matchedCards, firstIndex, index]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsGameOver(true);
      showNotification("🎉 You Win!", "success");
    }
  }, [matchedCards, cards]);

  const restartGame = () => {
    setMoves(0);
    setMatchedCards([]);
    setFlippedCards([]);
    setIsGameStarted(false);
    setIsGameOver(false);
    showNotification("Game restarted!", "info");
  };

  const startGame = () => {
    setIsGameStarted(true);
    showNotification("Game started! Good luck!", "info");
  };

  return (
    <div className="game-container">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="game-info">
        <p>Moves: {moves}</p>
        <p>Time Left: {isGameOver ? timer : `${timer}s`}</p>
      </div>
      <div className="game-controls">
        {!isGameStarted && !isGameOver && <button className="start-btn" onClick={startGame}>Start Game</button>}
        <button className="restart-btn" onClick={restartGame}>Restart Game</button>
      </div>
      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
        }}
      >
        {cards.map((value, index) => (
          <Card
            key={index}
            value={value}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
