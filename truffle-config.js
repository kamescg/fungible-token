require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider");

if (!process.env.PRIVATE_KEY) {
  throw new Error("define PRIVATE_KEY in .env first!");
} else {
  console.log(
    "Using env var PRIVATE_KEY",
    `${process.env.PRIVATE_KEY.substr(0, 4)}...`
  );
}
if (process.env.INFURA_APIKEY) {
  console.log(
    "Using env var INFURA_APIKEY",
    `${process.env.INFURA_APIKEY.substr(0, 4)}...`
  );
}
if (process.env.PRIVATE_NETWORK_URL) {
  console.log("Using env var PRIVATE_NETWORK", process.env.PRIVATE_NETWORK_URL);
}
if (process.env.PRIVATE_NETWORK_ID) {
  console.log(
    "Using env var PRIVATE_NETWORK_ID",
    process.env.PRIVATE_NETWORK_ID
  );
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*",
      // gas: 990000,
      // gasPrice: 1000000000 // web3.eth.gasPrice
    },
    coverage: {
      host: "localhost",
      port: 8555,
      network_id: "*",
      gas: 8000000,
      gasPrice: 1000000000, // web3.eth.gasPrice
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_APIKEY}`
        );
      },
      network_id: "4",
    },
  },
  compilers: {
    solc: {
      version: "0.5.14",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  mocha: {
    // https://github.com/cgewecke/eth-gas-reporter
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      gasPrice: 10,
      onlyCalledMethods: true,
      showTimeSpent: true,
      excludeContracts: ["Migrations"],
    },
  },
};
