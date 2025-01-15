require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();
require('hardhat-contract-sizer');
require('hardhat-storage-layout');


const { PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    compilers: [

      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000,
          },
          viaIR: true,
          evmVersion: "london",  // Ensuring compatibility with Flare
        },
      },
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000,
          },
          viaIR: true,
          evmVersion: "london",  // Ensuring compatibility with Flare
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000,
          },
          viaIR: true,
          evmVersion: "london",  // Ensuring compatibility with Flare
        },
      },
      {
        version: "0.8.14",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000,
          },
          viaIR: true,
          evmVersion: "london",  // Ensuring compatibility with Flare
        },
      },
    ],
  },
  paths: {
    sources: "./contracts", // Use the standard contract folder
    artifacts: "./artifacts", // Artifacts path
    cache: "./cache",
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      flare: "dummy-key",
      songbird: "dummy-key",
      coston: "dummy-key",
    },
    customChains: [
      {
        network: "flare",
        chainId: 14,
        urls: {
          apiURL: "https://flare-explorer.flare.network/api",
          browserURL: "https://flare-explorer.flare.network",
        },
      },
      {
        network: "songbird",
        chainId: 19,
        urls: {
          apiURL: "https://songbird-explorer.flare.network/api",
          browserURL: "https://songbird-explorer.flare.network",
        },
      },
      {
        network: "coston",
        chainId: 16,
        urls: {
          apiURL: "https://coston-explorer.flare.network/api",
          browserURL: "https://coston-explorer.flare.network",
        },
      },
    ],
  },
  networks: {
    localhost: {
      chainId: 31337,
      accounts: [`0x${PRIVATE_KEY}`],
      blockGasLimit: 30000000,
      evmVersion: "london",
    },
    flare: {
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
      url: "https://rpc.ankr.com/flare",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 14,
      blockGasLimit: 30000000,
      evmVersion: "london",
    },
    songbird: {
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
      url: "https://songbird-api.flare.network/ext/bc/C/rpc",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 19,
      blockGasLimit: 30000000,
      evmVersion: "london",
    },
    coston: {
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
      url: "https://coston-api.flare.network/ext/C/rpc",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 16,
      blockGasLimit: 30000000,
      evmVersion: "london",
    },
    mumbai: {
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
      url: "https://polygon-mumbai-bor-rpc.publicnode.com",
      chainId: 80001,
      accounts: [`0x${PRIVATE_KEY}`],
      blockGasLimit: 30000000,
    },
    polygon: {
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
      url: "https://polygon-rpc.com",
      chainId: 137,
      accounts: [`0x${PRIVATE_KEY}`],
      blockGasLimit: 30000000,
    },
    goerli: {
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
      url: "https://ethereum-goerli.publicnode.com",
      chainId: 5,
      accounts: [`0x${PRIVATE_KEY}`],
      blockGasLimit: 30000000,
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
};
