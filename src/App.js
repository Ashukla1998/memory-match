import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [level, setLevel] = useState(0);

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
  };

  return (
    <div className="app">
      <Header onLevelChange={handleLevelChange} />
      {level > 0 ? (
        <GameBoard level={level} />
      ) : (
        <p className="instructions">Select a level to start the game!</p>
      )}
    </div>
  );
};

export default App;
