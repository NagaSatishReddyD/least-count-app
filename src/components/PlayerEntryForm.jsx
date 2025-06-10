import { useState } from "react";

export default function PlayerEntryForm({ onStart }) {
  const [names, setNames] = useState([""]);

  const handleAdd = () => setNames([...names, ""]);
  const handleChange = (i, val) => {
    const newNames = [...names];
    newNames[i] = val;
    setNames(newNames);
  };

  const startGame = () => {
    const trimmed = names.map((n) => n.trim()).filter(Boolean);
    if (trimmed.length >= 2) onStart(trimmed);
  };

  return (
    <div className="card">
      <h2>Enter Player Names</h2>
      {names.map((name, i) => (
        <input
          key={i}
          className="input"
          value={name}
          onChange={(e) => handleChange(i, e.target.value)}
          placeholder={`Player ${i + 1}`}
        />
      ))}
      <div className="button-group">
        <button className="nav-button" onClick={handleAdd}>+ Add Player</button>
        <button className="nav-button" onClick={startGame} disabled={names.length < 2}>
          Start Game
        </button>
      </div>
    </div>
  );
}
