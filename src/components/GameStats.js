import React from 'react';

const GameStats = ({ timer, score, matches }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="stats-panel">
            <div className="stat-card">
                <div className="stat-label">⏱️ Time</div>
                <div className="stat-value timer">{formatTime(timer)}</div>
            </div>

            <div className="stat-card">
                <div className="stat-label">🎯 Score</div>
                <div className="stat-value score">{score}</div>
            </div>

            <div className="stat-card">
                <div className="stat-label">🎮 Matches</div>
                <div className="stat-value">{matches}/6</div>
            </div>
        </div>
    );
};

export default GameStats;
