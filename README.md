# 🎮 Blockchain Memory Game - NFT Rewards Edition

A fully decentralized memory matching game built on the Ethereum blockchain. Players match pairs of cards, and successful matches mint unique ERC-721 NFT tokens as rewards that are permanently stored on the blockchain.

![Solidity](https://img.shields.io/badge/Solidity-0.5.0-363636?style=flat-square&logo=solidity)
![React](https://img.shields.io/badge/React-16.8.4-61DAFB?style=flat-square&logo=react)
![Web3.js](https://img.shields.io/badge/Web3.js-1.0.0-F16822?style=flat-square&logo=web3.js)
![Truffle](https://img.shields.io/badge/Truffle-5.0.5-5E464D?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Locally](#-running-locally)
- [Smart Contract Deployment](#-smart-contract-deployment)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Testing](#-testing)
- [Future Improvements](#-future-improvements)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🎯 Overview

This project is a fully functional decentralized application (DApp) that combines gaming with blockchain technology. Players interact with a classic memory card matching game, but with a blockchain twist - every successful match mints a unique NFT token to the player's Ethereum wallet.

**Key Highlights:**
- Smart contracts written in Solidity
- ERC-721 compliant NFT tokens
- React-based user interface
- Web3.js for blockchain interaction
- MetaMask wallet integration
- Deployed on local Ethereum network (Ganache)

---

## 🛠 Tech Stack

### Blockchain Layer
- **Solidity (^0.5.0)** - Smart contract development
- **OpenZeppelin Contracts** - Secure ERC-721 implementation
- **Truffle Suite** - Development framework and testing
- **Ganache** - Local Ethereum blockchain for development

### Frontend Layer
- **React (16.8.4)** - User interface framework
- **Web3.js (1.0.0-beta.55)** - Ethereum JavaScript API
- **Bootstrap (4.3.1)** - UI styling and components
- **React Bootstrap** - React components for Bootstrap

### Development Tools
- **MetaMask** - Ethereum wallet browser extension
- **Babel** - JavaScript transpiler
- **Chai** - Testing assertion library

---

## 🏗 Architecture

```
┌─────────────────┐
│   React App     │ ← User Interface
│  (Frontend)     │
└────────┬────────┘
         │
         │ Web3.js
         ↓
┌─────────────────┐
│   MetaMask      │ ← Wallet Integration
│   Provider      │
└────────┬────────┘
         │
         │ JSON-RPC
         ↓
┌─────────────────┐
│    Ganache      │ ← Local Ethereum Network
│   (Testnet)     │
└────────┬────────┘
         │
         │
         ↓
┌─────────────────┐
│ MemoryToken.sol │ ← Smart Contract (ERC-721)
│  NFT Contract   │
└─────────────────┘
```

### Data Flow:
1. **User Action**: Player clicks on a card in the React UI
2. **State Management**: React component updates local state
3. **Match Detection**: JavaScript logic checks for matching pairs
4. **Blockchain Transaction**: Web3.js sends transaction to MetaMask
5. **User Confirmation**: MetaMask prompts user to approve gas fees
6. **Smart Contract Execution**: MemoryToken contract mints new NFT
7. **Event Emission**: Contract emits Transfer event
8. **UI Update**: React detects new token and updates display

---

## ✨ Features

- ✅ **Decentralized Gaming**: Fully on-chain game logic and NFT storage
- ✅ **ERC-721 NFT Rewards**: Each match mints a unique, tradeable NFT
- ✅ **MetaMask Integration**: Seamless wallet connection
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Real-time Updates**: Instant UI feedback on blockchain transactions
- ✅ **Card Shuffling**: Randomized card positions each game
- ✅ **Token Collection Display**: View all earned NFTs in your wallet
- ✅ **Gas Fee Transparency**: Clear transaction costs via MetaMask

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v10.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MetaMask** browser extension - [Install](https://metamask.io/)
- **Ganache** - [Download](https://trufflesuite.com/ganache/) or use Ganache CLI
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aaravanand00/blockchain-memory-game.git
cd blockchain-memory-game
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Truffle and smart contract dependencies
- React and frontend libraries
- Web3.js for blockchain interaction
- Testing frameworks

---

## 💻 Running Locally

### Step 1: Start Ganache

Launch Ganache GUI or start Ganache CLI:

```bash
# Using Ganache CLI
ganache-cli
```

**Note the following from Ganache output:**
- RPC Server address (usually `http://127.0.0.1:7545` or `8545`)
- Available accounts and their private keys

### Step 2: Configure MetaMask

1. Open MetaMask extension
2. Click network dropdown → "Add Network" → "Add a network manually"
3. Configure:
   - **Network Name**: `Ganache Local`
   - **RPC URL**: `http://127.0.0.1:7545`
   - **Chain ID**: `1337` (or `5777` depending on your Ganache)
   - **Currency Symbol**: `ETH`
4. Import a Ganache account:
   - Copy a private key from Ganache
   - MetaMask → Account icon → Import Account
   - Paste private key

### Step 3: Compile Smart Contracts

```bash
npx truffle compile
```

This generates contract ABIs in `src/abis/` directory.

### Step 4: Deploy Smart Contracts

```bash
npx truffle migrate --reset
```

**Expected output:**
```
Compiling your contracts...
===========================
> Compiling ./src/contracts/MemoryToken.sol
> Compiling ./src/contracts/ERC721Full.sol

Deploying 'MemoryToken'
----------------------
> transaction hash:    0x...
> contract address:    0x...
> block number:        2
> account:             0x...
> balance:             99.98...
> gas used:            ...
> gas price:           20 gwei
> value sent:          0 ETH
```

**Note:** Save the contract address - you may need it for debugging.

### Step 5: Start React Development Server

```bash
npm start
```

The application will open automatically at `http://localhost:3000`

### Step 6: Connect MetaMask

1. MetaMask will prompt to connect
2. Select the Ganache account you imported
3. Approve the connection

---

## 📜 Smart Contract Deployment

### Manual Deployment Steps

If you need to redeploy or modify contracts:

1. **Modify Contract** (if needed):
   ```bash
   # Edit src/contracts/MemoryToken.sol
   ```

2. **Compile**:
   ```bash
   npx truffle compile --all
   ```

3. **Deploy to Ganache**:
   ```bash
   npx truffle migrate --reset --network development
   ```

4. **Deploy to Testnet** (e.g., Sepolia):
   ```bash
   # First, configure truffle-config.js with testnet settings
   npx truffle migrate --network sepolia
   ```

### Verify Deployment

```bash
npx truffle console

# Inside Truffle console:
truffle(development)> let instance = await MemoryToken.deployed()
truffle(development)> instance.address
truffle(development)> instance.name()
truffle(development)> instance.symbol()
```

---

## 📁 Project Structure

```
blockchain-memory-game/
│
├── public/                      # Static files
│   ├── index.html              # HTML template
│   └── images/                 # Game card images
│       ├── blank.png
│       ├── white.png
│       ├── fries.png
│       ├── cheeseburger.png
│       ├── ice-cream.png
│       ├── pizza.png
│       ├── milkshake.png
│       └── hotdog.png
│
├── src/
│   ├── contracts/              # Solidity smart contracts
│   │   ├── MemoryToken.sol     # Main NFT contract
│   │   ├── ERC721Full.sol      # Full ERC-721 implementation
│   │   └── Migrations.sol      # Truffle migrations
│   │
│   ├── abis/                   # Compiled contract ABIs (auto-generated)
│   │   ├── MemoryToken.json
│   │   ├── ERC721Full.json
│   │   └── ...
│   │
│   ├── components/             # React components
│   │   ├── App.js              # Main application component
│   │   └── App.css             # Component styles
│   │
│   ├── index.js                # React entry point
│   └── brain.png               # App logo
│
├── migrations/                 # Truffle deployment scripts
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
│
├── test/                       # Smart contract tests
│   └── MemoryToken.test.js
│
├── truffle-config.js           # Truffle configuration
├── package.json                # Node.js dependencies
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

### Key Files Explained:

**MemoryToken.sol**
- Main smart contract inheriting from ERC721Full
- Implements `mint()` function to create NFTs
- Each NFT has unique token URI storing card image

**App.js**
- React component managing game state
- Web3 integration and blockchain interaction
- Card flip logic and match detection
- Transaction handling with MetaMask

**2_deploy_contracts.js**
- Truffle migration script
- Deploys MemoryToken contract to blockchain
- Can be configured for different networks

---

## ⚙️ How It Works

### Game Flow

1. **Initialization**:
   - User connects MetaMask wallet
   - React app loads Web3 and contract instance
   - Card array is randomized and displayed

2. **Card Selection**:
   - User clicks first card → Image reveals
   - User clicks second card → Image reveals
   - 100ms delay for user to see both cards

3. **Match Detection**:
   ```javascript
   if (card1.name === card2.name) {
     // Cards match!
     mintNFT();
   } else {
     // No match, cards flip back
     resetCards();
   }
   ```

4. **NFT Minting** (on successful match):
   ```javascript
   await token.methods.mint(
     userAddress,
     tokenURI  // Image URL of matched card
   ).send({ from: userAddress })
   ```

5. **Transaction Confirmation**:
   - MetaMask popup shows gas fee
   - User confirms transaction
   - Transaction mined on Ganache
   - NFT appears in user's collection

### Smart Contract Functions

**MemoryToken.sol**:
```solidity
function mint(address _to, string memory _tokenURI) 
    public returns(bool) {
    uint _tokenId = totalSupply().add(1);
    _mint(_to, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
    return true;
}
```

**Inherited from ERC721Full**:
- `balanceOf(address)` - Get NFT count for user
- `tokenOfOwnerByIndex(address, uint)` - Get specific NFT
- `tokenURI(uint)` - Get NFT metadata URI
- `totalSupply()` - Total NFTs minted

---

## 🧪 Testing

### Run Smart Contract Tests

```bash
npx truffle test
```

Expected output:
```
  Contract: MemoryToken
    ✓ has correct name
    ✓ has correct symbol
    ✓ mints new token
    ✓ sets token URI correctly
    ✓ tracks token ownership

  5 passing (234ms)
```

### Manual Testing Checklist

- [ ] MetaMask connects successfully
- [ ] All 12 cards display on page load
- [ ] Cards shuffle randomly on refresh
- [ ] Click reveals card image
- [ ] Matching pair triggers MetaMask transaction
- [ ] NFT appears in "Tokens Collected" section
- [ ] Transaction shows in Ganache blocks
- [ ] Gas fee deducted from account balance
- [ ] Non-matching pairs flip back after delay
- [ ] All 6 matches collected triggers completion message

---

## 🔮 Future Improvements

### Planned Features

- [ ] **Leaderboard System**: Track fastest completion times on-chain
- [ ] **Difficulty Levels**: Easy (6 cards), Medium (12 cards), Hard (24 cards)
- [ ] **Multiplayer Mode**: 1v1 matches with stake-based rewards
- [ ] **NFT Marketplace Integration**: Trade earned NFTs on OpenSea
- [ ] **Custom Card Themes**: Allow users to create custom card sets
- [ ] **Achievement Badges**: Special NFTs for milestones (10 wins, perfect game, etc.)
- [ ] **Mobile App**: React Native version for iOS/Android
- [ ] **Layer 2 Integration**: Deploy on Polygon/Arbitrum for lower gas fees
- [ ] **Sound Effects**: Audio feedback for matches and minting

### Technical Improvements

- [ ] Upgrade to Solidity ^0.8.0 with custom errors
- [ ] Implement ERC-721 royalties (EIP-2981)
- [ ] Add IPFS for decentralized image storage
- [ ] Optimize gas costs with efficient data structures
- [ ] Add comprehensive error handling
- [ ] Implement contract upgradability (proxy pattern)
- [ ] Create comprehensive test coverage (>90%)
- [ ] Add CI/CD pipeline for automated testing
- [ ] Integrate Hardhat for better development experience
- [ ] Add contract verification on Etherscan

---

## 📸 Screenshots

> **Note**: Add screenshots of your application here

### Homepage
![Game Interface](./screenshots/game-interface.png)
*Caption: Main game interface with card grid*

### MetaMask Transaction
![MetaMask Popup](./screenshots/metamask-transaction.png)
*Caption: MetaMask confirmation for NFT minting*

### NFT Collection
![Token Collection](./screenshots/nft-collection.png)
*Caption: User's collected NFT tokens*

### Ganache Transactions
![Ganache Blocks](./screenshots/ganache-blocks.png)
*Caption: Transaction history in Ganache*

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Write clear commit messages

---

## 👨‍💻 Author

**Aarav Anand**
- Role: Blockchain & Full-Stack Developer
- GitHub: [@Aaravanand00](https://github.com/Aaravanand00)
- Email: aaravanand5749@gmail.com

### About the Developer

I'm a blockchain and full-stack developer passionate about decentralized technologies and building innovative Web3 applications. This project represents my exploration into combining traditional gaming with blockchain technology to create unique user experiences.

Feel free to reach out for collaborations, questions, or just to connect!

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Aarav Anand

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **OpenZeppelin**: For secure smart contract libraries
- **Truffle Suite**: For excellent blockchain development tools
- **Ethereum Community**: For comprehensive documentation and support
- **Original Inspiration**: This project was adapted and significantly enhanced from educational blockchain game tutorials

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Aaravanand00/blockchain-memory-game/issues) page
2. Create a new issue with detailed description
3. Contact me directly at aaravanand5749@gmail.com

---

## ⭐ Show Your Support

If you found this project helpful or interesting, please consider:
- Giving it a ⭐ on GitHub
- Sharing it with others learning blockchain development
- Contributing improvements via Pull Requests

---

**Happy Gaming! 🎮 Happy Coding! 💻**
