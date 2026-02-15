import React from 'react';

const GameCard = ({ card, index, flipped, matched, onClick }) => {
    const isFlipped = flipped.includes(index) || matched.includes(index.toString());
    const isMatched = matched.includes(index.toString());

    return (
        <div className="card-wrapper">
            <div
                className={`game-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
                onClick={() => !isFlipped && onClick(index)}
            >
                <div className="card-face card-front">
                    <img
                        src={window.location.origin + '/images/blank.png'}
                        alt="Card back"
                        className="card-image"
                    />
                </div>
                <div className="card-face card-back">
                    <img
                        src={card.img}
                        alt={card.name}
                        className="card-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default GameCard;
