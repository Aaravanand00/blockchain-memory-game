import React from 'react';

const NFTRewardModal = ({ show, nftImage, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">🎉 NFT MINTED!</h2>
                <div className="modal-nft">
                    <img src={nftImage} alt="NFT Reward" />
                </div>
                <p className="modal-message">
                    Congratulations! Your match has been minted as an NFT and added to your collection!
                </p>
                <button className="modal-close" onClick={onClose}>
                    AWESOME!
                </button>
            </div>
        </div>
    );
};

export default NFTRewardModal;
