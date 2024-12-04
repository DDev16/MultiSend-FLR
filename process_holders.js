const fs = require('fs');
const path = './holders.json'; // Relative path to holders.json

// Define the amount of Ether to multiply by (34.5 Ether in Wei)
const etherMultiplier = BigInt(34.5 * 10 ** 18);

try {
  // Check if the file exists
  if (!fs.existsSync(path)) {
    console.error('Error: Input file does not exist:', path);
    process.exit(1);
  }

  // Read the holders.json file
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      // Parse the JSON data
      const holders = JSON.parse(data);

      // Prepare arrays for addresses and amounts
      const recipients = [];
      const amounts = [];

      // Process each holder
      holders.forEach(holder => {
        const balanceBigInt = BigInt(holder.balance);
        const amount = balanceBigInt * etherMultiplier;
        
        recipients.push(holder.address);
        amounts.push(amount.toString()); // Convert back to string for easier JSON readability
      });

      // Output the recipients and amounts arrays
      console.log('Recipients:', JSON.stringify(recipients, null, 2));
      console.log('Amounts:', JSON.stringify(amounts, null, 2));

      // Save the arrays to a file
      const outputPath = './airdrop_args.json'; // Relative path for the output file
      const outputData = { recipients, amounts };

      fs.writeFile(outputPath, JSON.stringify(outputData, null, 2), 'utf8', err => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('Airdrop arguments saved to', outputPath);
        }
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });
} catch (e) {
  console.error('Unexpected error:', e);
}
