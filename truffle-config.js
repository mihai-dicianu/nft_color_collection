require("babel-register");
require("babel-polyfill");

const { projectId, mnemonic } = require("./secrets.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${projectId}`
        ),
      network_id: 4, // Rinkeby's id
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "^0.5",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
