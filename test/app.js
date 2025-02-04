import config from './config.js';

// Now you can use the values from the config file
const contractAddress = config.contractAddress;
const senderAddress = config.senderAddress;
const ganacheRpcUrl = config.ganacheRpcUrl;

const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "landId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "LandOwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "landId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "area",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "LandRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "landCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "lands",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "area",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_area",
        "type": "uint256"
      }
    ],
    "name": "registerLand",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_landId",
        "type": "uint256"
      }
    ],
    "name": "getLand",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_landId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


let web3;
let landRegistry;

window.addEventListener('DOMContentLoaded', async () => {
    // Initialize Web3 and the contract
    web3 = new Web3(new Web3.providers.HttpProvider(ganacheRpcUrl));
    landRegistry = new web3.eth.Contract(contractABI, contractAddress);

    // Attach event listeners
    const landForm = document.getElementById('landForm');
    if (landForm) {
        landForm.addEventListener('submit', registerLand);
    } else {
        console.error("Land form not found!");
    }

    // Load the existing lands
    loadLands();
});

async function registerLand(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const area = parseInt(document.getElementById('area').value);

    if (area <= 0) {
        alert("Area must be a positive number.");
        return;
    }

    try {
        console.log(`Registering land with location: ${location}, area: ${area}`);
        await landRegistry.methods.registerLand(location, area).send({ from: senderAddress, gas: 5000000 });
        loadLands();
    } catch (error) {
        console.error("Error registering land:", error);
    }
}

async function loadLands() {
    const landCount = await landRegistry.methods.landCount().call();
    const landInfoDiv = document.getElementById('landInfo');
    landInfoDiv.innerHTML = '';  // Clear previous land info
    
    for (let i = 1; i <= landCount; i++) {
        const land = await landRegistry.methods.getLand(i).call();
        const landDetails = document.createElement('div');
        landDetails.className = 'land';
        landDetails.innerHTML = `
            <h3>Land ID: ${land[0]}</h3>
            <p>Location: ${land[1]}</p>
            <p>Area: ${land[2]}</p>
            <p>Owner: ${land[3]}</p>
            <p>Registered: ${land[4] ? 'Yes' : 'No'}</p>
            <button onclick="initiateOwnershipTransfer(${land[0]})">Transfer Ownership</button>
        `;
        landInfoDiv.appendChild(landDetails);
    }
}

async function fetchLand() {
    const landId = parseInt(document.getElementById('landId').value);
    if (isNaN(landId) || landId <= 0) {
        alert("Please enter a valid Land ID.");
        return;
    }

    try {
        const land = await landRegistry.methods.getLand(landId).call();
        document.getElementById('landDetails').innerHTML = `
            <p><strong>Location:</strong> ${land[1]}</p>
            <p><strong>Area:</strong> ${land[2]} sqm</p>
            <p><strong>Owner:</strong> ${land[3]}</p>
            <p><strong>Registered:</strong> ${land[4] ? 'Yes' : 'No'}</p>
        `;
    } catch (error) {
        console.error("Error fetching land info:", error);
        document.getElementById('landDetails').innerHTML = "Land not found or error fetching details.";
    }
}

async function transferOwnership(event) {
    event.preventDefault();

    const landId = parseInt(document.getElementById('landIdToTransfer').value);
    const newOwner = document.getElementById('newOwnerAddress').value;

    if (isNaN(landId) || landId <= 0) {
        alert("Please enter a valid Land ID.");
        return;
    }
    if (!web3.utils.isAddress(newOwner)) {
        alert("Please enter a valid Ethereum address.");
        return;
    }

    try {
        console.log(`Transferring ownership of Land ID ${landId} to ${newOwner}`);
        await landRegistry.methods.transferOwnership(landId, newOwner).send({ from: senderAddress, gas: 5000000 });
        loadLands(); // Refresh the land list after ownership transfer
    } catch (error) {
        console.error("Error transferring ownership:", error);
    }
}

function initiateOwnershipTransfer(landId) {
    const transferForm = document.getElementById('transferForm');
    const landIdToTransfer = document.getElementById('landIdToTransfer');
    landIdToTransfer.value = landId;
    transferForm.style.display = 'block'; // Show the transfer form
}

window.fetchLand = fetchLand;
window.transferOwnership = transferOwnership;
window.initiateOwnershipTransfer = initiateOwnershipTransfer;
