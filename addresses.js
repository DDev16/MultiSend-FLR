const fs = require("fs");
const path = require("path");

async function main() {
    // Path to holders.json
    const filePath = path.join(__dirname, "holders.json");

    // Check if holders.json exists
    if (!fs.existsSync(filePath)) {
        console.error("holders.json file not found. Please ensure the file exists.");
        process.exit(1);
    }

    // Read and parse holders.json
    const holdersData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Extract the addresses into an array
    const addresses = holdersData.map(holder => holder.address);

    console.log("Extracted Addresses Array:");
    console.log(addresses);

    // Optionally, save the addresses to a new file
    const outputFilePath = path.join(__dirname, "addresses.json");
    fs.writeFileSync(outputFilePath, JSON.stringify(addresses, null, 2), "utf-8");
    console.log(`Addresses saved to ${outputFilePath}`);
}

main().catch(error => {
    console.error("Error executing script:", error);
    process.exitCode = 1;
});
