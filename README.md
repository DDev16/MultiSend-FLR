README: Airdrop Setup and Execution Guide
This guide will help you set up and run the airdrop process step by step.

Prerequisites
Node.js installed on your system.
VS Code or another code editor with terminal access.
A private key for the wallet used to execute the airdrop.
Ensure you have Hardhat installed (npm install --save-dev hardhat).
Steps to Run the Airdrop

1. Clone the Repository
Open a terminal in VS Code or your preferred environment and clone the repository:


git clone https://github.com/DDev16/MultiSend-FLR.git
once cloned navigate to the project by typing 

go to open folder and find the MultiSend-FLR app and open it 

2. Add Your Private Key
Navigate to the .env folder in the project directory.
Add your private key to the .env file:


PRIVATE_KEY=your-private-key-here
Replace your-private-key-here with the private key for the wallet that will perform the airdrop.

3. Install Dependencies
In the terminal, navigate to the project directory and install the required dependencies:


npm install

Wait for the installation to complete.

4. Create the holders.json File
Run the following command to generate the holders.json file:



node getAllholders.js


This file will contain the addresses and balances of all holders.

5. Adjust the Ether Multiplier

Open the process_holders.js file and modify the following line to set the desired Ether multiplier:



const etherMultiplier = BigInt(34.5 * 10 ** 18);

Replace 34.5 with the desired multiplier value.

6. Create the airdrop_args.json File
Run the following command to process the holders.json file and generate the airdrop_args.json file:



node process_holders.js


This file will contain the recipients and corresponding amounts for the airdrop.

7. Execute the Airdrop
Run the following command to execute the airdrop:



npx hardhat run scripts/Airdrop.js --network flare

This command will use the airdrop_args.json file to send the airdrop to the holders.

Notes
Ensure that the wallet linked to your private key has sufficient balance to cover gas fees for the airdrop.
Verify all details in the holders.json and airdrop_args.json files before executing the airdrop.
