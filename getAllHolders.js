// Import required modules
require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

// Configure provider (Flare network RPC URL from .env)
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Define contract address and ABI
const contractAddress = "0x83a153148f62fcbdA4F444850f5AdB73DF43A4E2"; // Your contract address
const contractABI = [
  "function getAllHolders() view returns (address[] memory, uint256[] memory)" // ABI for getAllHolders function
];

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

async function fetchAndSaveHolders() {
  try {
    // Call the getAllHolders function
    const [holders, balances] = await contract.getAllHolders();

    // Format data as an array of objects
    const holdersData = holders.map((holder, index) => ({
      address: holder,
      balance: balances[index].toString(), // Convert balance to a string for readability
    }));

    // Save to a JSON file
    fs.writeFileSync("holders.json", JSON.stringify(holdersData, null, 2));
    console.log("Holders data saved to holders.json");
  } catch (error) {
    console.error("Error fetching or saving holders:", error);
  }
}

// Execute the function
fetchAndSaveHolders();
