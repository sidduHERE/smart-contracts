require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require('hardhat-abi-exporter');
require('hardhat-contract-sizer');
const dotenv = require("dotenv");
dotenv.config();

const AVALANCHE_MAINNET_URL = process.env.AVALANCHE_MAINNET_URL;
const AVALANCHE_FUJI_URL = process.env.AVALANCHE_FUJI_URL;
const MATIC_MAINNET_URL = "https://rpc-mainnet.maticvigil.com/v1/22457d52d868eef361e5ebce5cbd3f83cf234ad5";
//const TEST = "https://rpc-mainnet.matic.network";
const PK_USER = process.env.PK_USER;
const PK_OWNER = process.env.PK_OWNER;
const PK_TEST = process.env.PK_TEST;

// require scripts
const farmData = require("./scripts/farm-data");

// tasks
task("checkFarmState", "Gives a nice output of the state of the farm")
  .addParam("farm", "Farm to check the state of")
  .setAction(async ({ farm }) => farmData(farm));

  task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();
  
    for (const account of accounts) {
      console.log(account.address);
    }
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999
      }
    }
  },
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: 1,
    }
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  paths: {
    deploy: 'deploy',
    deployments: 'deployments'
  },
  abiExporter: {
    path: './abis',
    clear: true,
    flat: true
  },
  networks: {
    hardhat: {
      chainId: 137,
      gasPrice: 225000000000,
      throwOnTransactionFailures: false,
      loggingEnabled: true,
      forking: {
        url: "https://polygon-mainnet.g.alchemy.com/v2/nGUNl3upCawPa6Rd0E97kpmOLte8HTNX",
        enabled: true
      }
    },
    mainnet: {
      chainId: 43114,
      gasPrice: 225000000000,
      url: AVALANCHE_MAINNET_URL,
      seeds: [
        PK_USER,
        PK_OWNER
      ]
    },
    fuji: {
      chainId: 1337,
      gasPrice: 225000000000,
      url: "http://127.0.0.1:7545",
      seeds: [
        PK_TEST
      ]
    },
  }
};
