import React from 'react';

const TransactionStatus = ({ status, message, onClose }) => {
    if (!status) return null;

    const getIcon = () => {
        switch (status) {
            case 'pending':
                return <div className="spinner"></div>;
            case 'confirmed':
                return '✅';
            case 'error':
                return '❌';
            default:
                return '⏳';
        }
    };

    const getTitle = () => {
        switch (status) {
            case 'pending':
                return 'Transaction Pending';
            case 'confirmed':
                return 'Transaction Confirmed!';
            case 'error':
                return 'Transaction Failed';
            default:
                return 'Processing...';
        }
    };

    return (
        <div className={`transaction-status ${status}`}>
            <div className="tx-header">
                <div className="tx-icon">{getIcon()}</div>
                <div>
                    <div className="tx-title">{getTitle()}</div>
                </div>
            </div>
            <div className="tx-message">{message}</div>
            {status === 'confirmed' || status === 'error' ? (
                <button
                    onClick={onClose}
                    className="action-btn primary"
                    style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', width: '100%' }}
                >
                    Close
                </button>
            ) : null}
        </div>
    );
};

export default TransactionStatus;
