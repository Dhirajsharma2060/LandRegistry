# 🌍 Land Registry DApp

A **decentralized land registry system** built on the **Ethereum blockchain** using **Solidity, Web3.js, and HTML/CSS**. This DApp allows users to **register land** and **fetch land details** securely, ensuring **transparency** and **immutability** in land records.

## 🚀 Features
- 📌 **Register Land** with location, area, and ownership details.
- 🔍 **Search Land** using its unique ID.
- 🔗 **Decentralized Storage** ensures secure and tamper-proof records.
- ⚡ **Blockchain-Powered** - Immutable & trustless transactions.

## 🛠️ Tech Stack
- **Smart Contract:** Solidity (`^0.8.0`)
- **Blockchain Network:** Ethereum (Ganache for testing)
- **Frontend:** HTML, CSS, JavaScript
- **Web3 Integration:** Web3.js
- **Development Tools:** Truffle, Ganache, MetaMask

## 📌 How to Use

### 📦 1. Clone the Repository
```sh
git clone https://github.com/Dhirajsharma2060/LandRegistery
cd LandRegistryDApp
```
### ⚒️ 2. Install Dependencies
**Ensure Node.js and Truffle are installed. Then, install dependencies:**
```sh
npm install
```
### 🔥 3. Start Ganache (Local Blockchain)
- **Open Ganache and start a new workspace.**

### 🔨 4. Deploy the Smart Contract
**Compile and deploy the contract to the local blockchain:**
```sh
truffle compile
truffle migrate --reset
```

### 5. Note: Make the necesaary changes in the truffle-config.js 
```sh
#keep the development environment in truffle-config.js
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
```     

```sh
#note on truffle-config.js the compiler should be somthing like this 
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
```
### 🌐 6. Run the Frontend
**Open the live server in the html file**
http://127.0.0.1:5501/test/index.html#

some thing like this 

### 📝 License
This project is MIT Licensed. Feel free to use and modify it.
