const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // Load recipients and amounts from airdrop_args.json
  const path = 'C:\\Users\\dever\\billi-airdrop\\airdrop_args.json';
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  const recipients = data.recipients;
  const amounts = data.amounts.map(amount => BigInt(amount)); // Convert amounts to BigInt

  // Connect to the deployed contract
  const multisendAddress = "0xFEa673C77204637aeDE29BD1eb6568e2F85d5e2A"; // Replace with your contract address
  const [deployer] = await hre.ethers.getSigners();
  const MultisendContract = await hre.ethers.getContractAt("Multisender", multisendAddress, deployer);

  // Batch settings
  const batchSize = 5; // Adjust based on gas requirements
  const maxRetries = 3; // Number of retry attempts for failed batches
  let nonce = await hre.ethers.provider.getTransactionCount(deployer.address); // Use provider to get nonce

  // Helper function to send a batch with retry logic
  async function sendBatchWithRetry(batchRecipients, batchAmounts, batchTotal, currentNonce) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}: Sending batch with nonce ${currentNonce}...`);
        const tx = await MultisendContract.multisendFlare(batchRecipients, batchAmounts, {
          value: batchTotal,
          nonce: currentNonce,
        });
        await tx.wait();
        console.log(`Batch successful with hash: ${tx.hash}`);
        return true; // If successful, return true
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        if (attempt === maxRetries) {
          console.error(`Batch failed after ${maxRetries} attempts.`);
          return false; // If all retries fail, return false
        }
        console.log("Retrying...");
      }
    }
  }

  // Loop through batches of recipients
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batchRecipients = recipients.slice(i, i + batchSize);
    const batchAmounts = amounts.slice(i, i + batchSize);

    // Calculate the total Ether needed for this batch
    const batchTotal = batchAmounts.reduce((acc, amount) => acc + amount, 0n);

    // Send the batch with retry logic
    const success = await sendBatchWithRetry(batchRecipients, batchAmounts, batchTotal, nonce);

    if (success) {
      nonce++; // Increment nonce for the next transaction only if successful
    } else {
      console.error(`Stopping execution due to repeated failures in batch ${i / batchSize + 1}.`);
      break;
    }
  }

  console.log("All batches processed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
