require("@nomicfoundation/hardhat-toolbox");
const fs = require("fs");
const privateKey = fs.readFileSync("secret.txt").toString();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "HederaTestnet",
  networks: {
    hardhat: {
      chainId: 296,
    },
    HederaTestnet: {
      url: "https://testnet.hashio.io/api",
      accounts: [privateKey],
      gasPrice: 1000000000,
    },
  },
  solidity: "0.8.24",
  allowUnlimitedContractSize: true,
  throwOnTransactionFailures: true,
  throwOnCallFailures: true,
};
