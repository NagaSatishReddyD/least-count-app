import { useEffect, useState } from "react";
import PlayerEntryForm from "./components/PlayerEntryForm";
import Dropdown from "./components/Dropdown";
import ScoreBoard from "./components/ScoreBoard";
import "./App.css";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [maxScore, setMaxScore] = useState(50);
  const [scores, setScores] = useState([]);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [loadingFromSave, setLoadingFromSave] = useState(false);

  // 🔍 Check for saved data on first load
  useEffect(() => {
    const saved = localStorage.getItem("least-count-game");
    console.log("Checking for saved game data:", saved);
    if (saved) {
      setHasSavedGame(true);
    }
  }, []);

  // 💾 Save any game changes
  useEffect(() => {
    const gameData = { players, scores, maxScore };
    if (players.length > 0) {
      localStorage.setItem("least-count-game", JSON.stringify(gameData));
    }
  }, [players, scores, maxScore]);

  // ✅ Continue saved game
  const continueSavedGame = () => {
    const saved = localStorage.getItem("least-count-game");
    if (saved) {
      try {
        const { players, scores, maxScore } = JSON.parse(saved);
        setPlayers(players);
        setScores(scores);
        setMaxScore(maxScore);
        setLoadingFromSave(false);
        setHasSavedGame(false);
      } catch (err) {
        console.error("Failed to restore saved game:", err);
        setHasSavedGame(false);
      }
    }
  };

  // ❌ Start new game from scratch
  const startNewGame = () => {
    localStorage.removeItem("least-count-game");
    setHasSavedGame(false);
    setPlayers([]);
    setScores([]);
    setMaxScore(50);
  };

  const handleAddRound = () => {
    setScores([...scores, Array(players.length).fill("")]);
  };

  const handleScoreChange = (roundIdx, playerIdx, value) => {
    const updated = [...scores];
    const parsed = parseInt(value);
    updated[roundIdx][playerIdx] = isNaN(parsed) ? "" : parsed;
    setScores(updated);
  };

  const totalScores = players.map((_, idx) =>
    scores.reduce((sum, round) => sum + (parseInt(round[idx]) || 0), 0)
  );

  const restartGame = () => setScores([]);

  const resetToHome = () => {
    setPlayers([]);
    setScores([]);
    setMaxScore(50);
    localStorage.removeItem("least-count-game");
  };

  const inGameScores = totalScores
    .map((score, idx) => ({ name: players[idx], score }))
    .filter(player => player.score < maxScore);

  const minScore = Math.min(...inGameScores.map(p => p.score));
  const winners = inGameScores.filter(p => p.score === minScore);


  return (
    <div className="wrapper">
      <div className="container">
        <div className="sticky-header">
          <h1>Least Count Score Card</h1>

          <div className="button-group">
            <button className="nav-button" onClick={restartGame}>
              🔁 Restart
            </button>
            <button className="nav-button" onClick={resetToHome}>
              🏠 Home
            </button>
          </div>
        </div>
        <div>
          {winners.length > 0 && (
            <div className="winner-text">
              🎉 Winner{winners.length > 1 ? "s" : ""}:{" "}
              {winners.map((w) => w.name).join(", ")}
            </div>
          )}
        </div>

         {/* 🔄 Show continue prompt if needed */}
        {hasSavedGame && !loadingFromSave && players.length === 0 ? (
          <div className="card">
            <h3>Continue your last game?</h3>
            <div className="button-group">
              <button className="nav-button" onClick={continueSavedGame}>🔁 Continue Game</button>
              <button className="nav-button" onClick={startNewGame}>🆕 New Game</button>
            </div>
          </div>
        ) : players.length === 0 ? (
          <>
            <Dropdown onSelect={setMaxScore} />
            <PlayerEntryForm onStart={setPlayers} />
          </>
        ) : (
          <>
            <ScoreBoard
              players={players}
              scores={scores}
              totalScores={totalScores}
              maxScore={maxScore}
              onAddRound={handleAddRound}
              onScoreChange={handleScoreChange}
            />

          </>
        )}
      </div>
    </div>
  );
}
