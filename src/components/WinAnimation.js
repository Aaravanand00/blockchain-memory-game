import React, { useEffect, useState } from 'react';

const WinAnimation = ({ show, time, score, onRestart }) => {
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        if (show) {
            // Generate confetti
            const colors = ['#00f0ff', '#ff006e', '#8b5cf6', '#00ff88'];
            const confettiPieces = [];

            for (let i = 0; i < 100; i++) {
                confettiPieces.push({
                    id: i,
                    left: Math.random() * 100,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    delay: Math.random() * 2
                });
            }

            setConfetti(confettiPieces);
        }
    }, [show]);

    if (!show) return null;

    return (
        <div className="win-overlay">
            {confetti.map(piece => (
                <div
                    key={piece.id}
                    className="confetti"
                    style={{
                        left: `${piece.left}%`,
                        backgroundColor: piece.color,
                        animationDelay: `${piece.delay}s`
                    }}
                ></div>
            ))}

            <div className="win-content">
                <h1 className="win-title">VICTORY!</h1>
                <div className="win-stats">
                    <p>⏱️ Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
                    <p>🎯 Score: {score} points</p>
                    <p>🏆 All NFTs Collected!</p>
                </div>
                <button className="restart-btn" onClick={onRestart}>
                    PLAY AGAIN
                </button>
            </div>
        </div>
    );
};

export default WinAnimation;
