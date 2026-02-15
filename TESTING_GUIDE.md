# 🚀 Quick Testing Guide

## ✅ What's Done
1. ✅ Node.js v24.13.0 verified
2. ✅ Dependencies installed (2386 packages)
3. ✅ Smart contracts compiled successfully

## 📋 Next Steps (Manual)

### Step 1: Start Ganache

**Option A: Ganache GUI (Recommended)**
1. Download from: https://trufflesuite.com/ganache/
2. Install and open Ganache
3. Click "Quickstart" → Creates blockchain on `http://127.0.0.1:7545`
4. Note down one of the private keys for MetaMask

**Option B: Ganache CLI (if installed globally)**
```bash
ganache-cli
```

### Step 2: Deploy Contracts

Once Ganache is running:
```bash
npx truffle migrate --reset
```

You should see:
```
Deploying 'MemoryToken'
----------------------
> transaction hash:    0x...
> contract address:    0x...
> block number:        2
```

### Step 3: Configure MetaMask

1. Open MetaMask extension
2. Click network dropdown → "Add Network"
3. Add custom network:
   - Network Name: `Ganache Local`
   - RPC URL: `http://127.0.0.1:7545`
   - Chain ID: `1337` (or `5777`)
   - Currency Symbol: `ETH`

4. Import Ganache account:
   - Copy a private key from Ganache
   - MetaMask → Import Account
   - Paste private key

### Step 4: Start React App

```bash
npm start
```

App will open at: `http://localhost:3000`

### Step 5: Test the Game

1. ✅ Connect MetaMask (should auto-connect)
2. ✅ Click cards to play
3. ✅ Match cards → MetaMask popup appears
4. ✅ Approve transaction
5. ✅ NFT minted and appears in collection!

## 🐛 Troubleshooting

### MetaMask not connecting?
- Check network is set to Ganache
- Refresh page
- Reconnect wallet

### Transaction failing?
- Check Ganache is running
- Check account has ETH
- Try resetting MetaMask account (Settings → Advanced → Reset Account)

### Contract not found?
- Redeploy: `npx truffle migrate --reset`
- Refresh browser

## ✨ Expected Behavior

- Smooth 60fps animations
- Crisp card flips (0.4s)
- Transaction status widget on successful match
- NFT celebration modal
- Win screen with confetti on completion

---

**Ready to test! Start Ganache and run the commands above.** 🎮
