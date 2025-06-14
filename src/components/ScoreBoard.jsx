import React from "react";
import "./ScoreBoard.css";

export default function ScoreBoard({
  players,
  scores,
  totalScores,
  maxScore,
  onAddRound,
  onScoreChange,
}) {
  return (
    <div className="scoreboard">
      <div className="score-scroll-wrapper">
        <div
          className="score-grid"
          style={{
            gridTemplateColumns: `80px repeat(${players.length}, minmax(100px, 1fr))`,
          }}
        >
          {/* Header */}
          <div className="header-cell">Round</div>
          {players.map((name, idx) => (
            <div className="header-cell" key={`header-${idx}`}>
              {name}
            </div>
          ))}

          {/* Rounds */}
          {scores.map((round, rIdx) => (
            <React.Fragment key={`round-${rIdx}`}>
              <div className="cell">{rIdx + 1}</div>
              {players.map((_, pIdx) => (
                <input
                  id={`r${players[pIdx]}-${rIdx}-p${pIdx}`}
                  key={`r${rIdx}-p${pIdx}`}
                  type="number"
                  className={`score-input ${totalScores[pIdx] >= maxScore ? "exceeded" : ""
                    }`}
                  value={round[pIdx] === 0 ? "" : round[pIdx]}
                  placeholder={players[pIdx]}
                  onChange={(e) =>
                    onScoreChange(rIdx, pIdx, e.target.value)
                  }
                />
              ))}
            </React.Fragment>
          ))}

          {/* Totals */}
          <div className="footer-cell">Total</div>
          {totalScores.map((t, idx) => (
            <div
              key={`total-${idx}`}
              className={`footer-cell ${t >= maxScore ? "out" : "in"}`}
            >
              {t} {t >= maxScore ? "(OUT)" : ""}
            </div>
          ))}
        </div>
      </div>

      <button className="add-round" onClick={onAddRound}>
        ➕ Add Round
      </button>
    </div>
  );
}
