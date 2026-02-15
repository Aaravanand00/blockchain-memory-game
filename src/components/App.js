import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import MemoryToken from '../abis/MemoryToken.json';
import brain from '../brain.png';

// Import components
import GameStats from './GameStats';
import TransactionStatus from './TransactionStatus';
import NFTRewardModal from './NFTRewardModal';
import WinAnimation from './WinAnimation';
import GameCard from './GameCard';

const CARD_ARRAY = [
  { name: 'fries', img: '/images/fries.png' },
  { name: 'cheeseburger', img: '/images/cheeseburger.png' },
  { name: 'ice-cream', img: '/images/ice-cream.png' },
  { name: 'pizza', img: '/images/pizza.png' },
  { name: 'milkshake', img: '/images/milkshake.png' },
  { name: 'hotdog', img: '/images/hotdog.png' },
  { name: 'fries', img: '/images/fries.png' },
  { name: 'cheeseburger', img: '/images/cheeseburger.png' },
  { name: 'ice-cream', img: '/images/ice-cream.png' },
  { name: 'pizza', img: '/images/pizza.png' },
  { name: 'milkshake', img: '/images/milkshake.png' },
  { name: 'hotdog', img: '/images/hotdog.png' }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      token: null,
      totalSupply: 0,
      tokenURIs: [],
      cardArray: [],
      cardsChosen: [],
      cardsChosenId: [],
      cardsWon: [],
      flippedCards: [],
      score: 0,
      timer: 0,
      particles: [],
      transactionStatus: null,
      transactionMessage: '',
      showNFTModal: false,
      showWinAnimation: false,
      lastMintedNFT: '',
      finalScore: 0,
      finalTime: 0,
      networkName: 'Unknown',
      isProcessing: false, // Prevent multiple clicks during transaction
      pendingMatchData: null // Store match data for retry
    };
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    this.setState({ cardArray: CARD_ARRAY.sort(() => 0.5 - Math.random()) });
    this.startTimer();
    this.createParticles();
  }

  componentWillUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // Get network name
    const networkId = await web3.eth.net.getId();
    const networkName = this.getNetworkName(networkId);
    this.setState({ networkName });

    // Load smart contract
    const networkData = MemoryToken.networks[networkId];
    if (networkData) {
      const abi = MemoryToken.abi;
      const address = networkData.address;
      const token = new web3.eth.Contract(abi, address);
      this.setState({ token });
      const totalSupply = await token.methods.totalSupply().call();
      this.setState({ totalSupply });

      // Load existing NFTs
      let balanceOf = await token.methods.balanceOf(accounts[0]).call();
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call();
        let tokenURI = await token.methods.tokenURI(id).call();
        this.setState({
          tokenURIs: [...this.state.tokenURIs, tokenURI]
        });
      }
    } else {
      alert('Smart contract not deployed to detected network.');
    }
  }

  getNetworkName(networkId) {
    const networks = {
      1: 'Mainnet',
      3: 'Ropsten',
      4: 'Rinkeby',
      5: 'Goerli',
      11155111: 'Sepolia',
      1337: 'Ganache',
      5777: 'Ganache'
    };
    return networks[networkId] || `Network ${networkId}`;
  }

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 1000);
  };

  createParticles = () => {
    // Only 5 particles for performance
    const particles = [];
    for (let i = 0; i < 5; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 10 + 20,
        delay: Math.random() * 8
      });
    }
    this.setState({ particles });
  };

  flipCard = async (cardId) => {
    // Prevent flipping during transaction or if 2 cards already selected
    if (this.state.isProcessing || this.state.cardsChosen.length >= 2) {
      return;
    }

    let alreadyChosen = this.state.cardsChosen.length;

    this.setState({
      cardsChosen: [...this.state.cardsChosen, this.state.cardArray[cardId].name],
      cardsChosenId: [...this.state.cardsChosenId, cardId],
      flippedCards: [...this.state.flippedCards, cardId]
    });

    if (alreadyChosen === 1) {
      setTimeout(this.checkForMatch, 500);
    }
  };

  checkForMatch = async () => {
    const optionOneId = this.state.cardsChosenId[0];
    const optionTwoId = this.state.cardsChosenId[1];

    if (optionOneId === optionTwoId) {
      alert('You have clicked the same image!');
      this.setState({
        cardsChosen: [],
        cardsChosenId: [],
        flippedCards: []
      });
      return;
    }

    if (this.state.cardsChosen[0] === this.state.cardsChosen[1]) {
      // Match found!
      const newScore = this.state.score + 100;
      const mintData = {
        optionOneId,
        optionTwoId,
        newScore
      };

      this.setState({
        score: newScore,
        isProcessing: true,
        pendingMatchData: mintData
      });

      // Mint NFT
      this.mintNFT(mintData);
    } else {
      // No match - flip cards back
      setTimeout(() => {
        this.setState({
          flippedCards: this.state.flippedCards.filter(
            id => id !== optionOneId && id !== optionTwoId
          )
        });
      }, 800);
    }

    this.setState({
      cardsChosen: [],
      cardsChosenId: []
    });
  };

  mintNFT = (matchData) => {
    const { optionOneId } = matchData;

    this.setState({
      transactionStatus: 'pending',
      transactionMessage: 'Minting your NFT reward...'
    });

    this.state.token.methods
      .mint(
        this.state.account,
        window.location.origin + CARD_ARRAY[optionOneId].img.toString()
      )
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.handleMintSuccess(matchData);
      })
      .on('error', (error) => {
        this.handleMintError(error);
      });
  };

  handleMintSuccess = (matchData) => {
    const { optionOneId, optionTwoId } = matchData;

    this.setState({
      cardsWon: [...this.state.cardsWon, optionOneId.toString(), optionTwoId.toString()],
      tokenURIs: [...this.state.tokenURIs, CARD_ARRAY[optionOneId].img],
      transactionStatus: 'confirmed',
      transactionMessage: 'NFT successfully minted!',
      showNFTModal: true,
      lastMintedNFT: window.location.origin + CARD_ARRAY[optionOneId].img.toString(),
      isProcessing: false,
      pendingMatchData: null
    });

    // Auto-hide transaction status
    setTimeout(() => {
      this.setState({ transactionStatus: null });
    }, 3000);

    // Check for win
    if (this.state.cardsWon.length + 2 === CARD_ARRAY.length) {
      setTimeout(() => {
        this.setState({
          showWinAnimation: true,
          finalScore: this.state.score,
          finalTime: this.state.timer
        });
        clearInterval(this.timerInterval);
      }, 800);
    }
  };

  handleMintError = (error) => {
    this.setState({
      transactionStatus: 'error',
      transactionMessage: error.message || 'Transaction failed. Please try again.',
      isProcessing: false
    });
  };

  retryMint = () => {
    if (this.state.pendingMatchData) {
      this.mintNFT(this.state.pendingMatchData);
    }
  };

  restartGame = () => {
    this.setState({
      cardArray: CARD_ARRAY.sort(() => 0.5 - Math.random()),
      cardsChosen: [],
      cardsChosenId: [],
      cardsWon: [],
      flippedCards: [],
      score: 0,
      timer: 0,
      showWinAnimation: false,
      showNFTModal: false,
      transactionStatus: null,
      isProcessing: false,
      pendingMatchData: null
    });
    clearInterval(this.timerInterval);
    this.startTimer();
  };

  closeNFTModal = () => {
    this.setState({ showNFTModal: false });
  };

  closeTransactionStatus = () => {
    this.setState({ transactionStatus: null, pendingMatchData: null });
  };

  render() {
    return (
      <div>
        {/* Subtle Background */}
        <div className="app-background"></div>

        {/* Minimal Particles (5 only) */}
        <div className="particles">
          {this.state.particles.map(particle => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`
              }}
            ></div>
          ))}
        </div>

        {/* Navbar */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
            rel="noopener noreferrer"
          >
            <img src={brain} width="40" height="40" className="brand-logo" alt="" />
            MEMORY TOKENS
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <span className="network-indicator">
                <span className="network-dot"></span>
                {this.state.networkName}
              </span>
              <small className="wallet-address">
                {this.state.account.substring(0, 6)}...
                {this.state.account.substring(38, 42)}
              </small>
            </li>
          </ul>
        </nav>

        {/* Main Container */}
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">

                {/* Game Header */}
                <div className="game-header">
                  <h1 className="game-title">MATCH & MINT</h1>
                  <p className="game-subtitle">
                    Match cards to mint exclusive NFT rewards
                  </p>
                </div>

                {/* Game Stats */}
                <GameStats
                  timer={this.state.timer}
                  score={this.state.score}
                  matches={this.state.cardsWon.length / 2}
                />

                {/* Action Buttons - Disabled during transaction */}
                <div className="action-buttons">
                  <button
                    className="action-btn primary"
                    onClick={this.restartGame}
                    disabled={this.state.isProcessing}
                  >
                    🔄 Restart Game
                  </button>
                </div>

                {/* Game Grid */}
                <div className="grid mb-4">
                  {this.state.cardArray.map((card, key) => (
                    <GameCard
                      key={key}
                      card={card}
                      index={key}
                      flipped={this.state.flippedCards}
                      matched={this.state.cardsWon}
                      onClick={this.flipCard}
                    />
                  ))}
                </div>

                {/* NFT Collection */}
                <div className="nft-section">
                  <h2 className="nft-header">
                    <span className="blockchain-icon"></span>
                    YOUR NFT COLLECTION
                  </h2>

                  <div className="text-center mb-4">
                    <span className="token-count">
                      🏆 {this.state.tokenURIs.length} NFTs Collected
                    </span>
                  </div>

                  <div className="nft-grid">
                    {this.state.tokenURIs.map((tokenURI, key) => (
                      <div key={key} className="nft-token">
                        <img
                          src={tokenURI}
                          alt={`NFT ${key + 1}`}
                          className="nft-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </main>
          </div>
        </div>

        {/* Transaction Status with Retry */}
        {this.state.transactionStatus && (
          <div className={`transaction-status ${this.state.transactionStatus}`}>
            <div className="tx-header">
              <div className="tx-icon">
                {this.state.transactionStatus === 'pending' && <div className="spinner"></div>}
                {this.state.transactionStatus === 'confirmed' && '✅'}
                {this.state.transactionStatus === 'error' && '❌'}
              </div>
              <div>
                <div className="tx-title">
                  {this.state.transactionStatus === 'pending' && 'Transaction Pending'}
                  {this.state.transactionStatus === 'confirmed' && 'Transaction Confirmed!'}
                  {this.state.transactionStatus === 'error' && 'Transaction Failed'}
                </div>
              </div>
            </div>
            <div className="tx-message">{this.state.transactionMessage}</div>

            {/* Retry button on error */}
            {this.state.transactionStatus === 'error' && this.state.pendingMatchData && (
              <button className="retry-btn" onClick={this.retryMint}>
                🔄 Retry Transaction
              </button>
            )}

            {/* Close button on success/error */}
            {(this.state.transactionStatus === 'confirmed' || this.state.transactionStatus === 'error') && (
              <button
                onClick={this.closeTransactionStatus}
                className="action-btn primary"
                style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', width: '100%' }}
              >
                Close
              </button>
            )}
          </div>
        )}

        {/* NFT Reward Modal */}
        <NFTRewardModal
          show={this.state.showNFTModal}
          nftImage={this.state.lastMintedNFT}
          onClose={this.closeNFTModal}
        />

        {/* Win Animation */}
        <WinAnimation
          show={this.state.showWinAnimation}
          time={this.state.finalTime}
          score={this.state.finalScore}
          onRestart={this.restartGame}
        />
      </div>
    );
  }
}

export default App;
