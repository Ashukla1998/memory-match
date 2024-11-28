import React from "react";

const Header = ({ onLevelChange }) => {
  return (
    <header className="header">
      <h1>Memory Match Game</h1>
      <div className="level-buttons">
        <select onChange={(e) => onLevelChange(Number(e.target.value))}>
          <option value={1}>Level 1: 2x2</option>
          <option value={2}>Level 2: 2x3</option>
          <option value={3}>Level 3: 3x3</option>
          <option value={4}>Level 4: 3x4</option>
          <option value={5}>Level 5: 4x4</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
