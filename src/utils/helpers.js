/**
 * Package.json - Updated for Redesigned UI
 * No changes needed - all new features use existing dependencies
 * 
 * The redesign uses:
 * - React (already installed)
 * - CSS3 (native)
 * - Web3 (already installed)
 * 
 * Optional future enhancements could add:
 * - howler: For sound effects
 * - react-confetti: For better confetti (currently using CSS)
 * - framer-motion: For advanced animations
 * - three.js: For 3D backgrounds
 * 
 * But current implementation requires NO additional dependencies!
 */

// Sound utility (for future implementation)
export const playSound = (soundName) => {
    // Placeholder for sound implementation
    // Add sound files to public/sounds/ folder
    // Uncomment when ready:

    /*
    const sounds = {
      flip: new Audio('/sounds/flip.mp3'),
      match: new Audio('/sounds/match.mp3'),
      nomatch: new Audio('/sounds/nomatch.mp3'),
      win: new Audio('/sounds/win.mp3')
    };
    
    if (sounds[soundName]) {
      sounds[soundName].currentTime = 0;
      sounds[soundName].play();
    }
    */
};

// Utility to format wallet address
export const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(38, 42)}`;
};

// Utility to format timer
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Network configurations
export const NETWORKS = {
    1: 'Mainnet',
    3: 'Ropsten',
    4: 'Rinkeby',
    5: 'Goerli',
    11155111: 'Sepolia',
    1337: 'Ganache',
    5777: 'Ganache'
};

// Game difficulty configurations (for future use)
export const DIFFICULTY_LEVELS = {
    easy: {
        name: 'Easy',
        cards: 8,
        timeBonus: 200
    },
    medium: {
        name: 'Medium',
        cards: 12,
        timeBonus: 100
    },
    hard: {
        name: 'Hard',
        cards: 16,
        timeBonus: 50
    }
};
