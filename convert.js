const fs = require('fs');
const csv = require('csv-parse');
const path = require('path');

// Input and output file paths
const inputFile = path.join(__dirname, 'holders.csv');
const outputFile = path.join(__dirname, 'holders.json');

// Read and parse CSV
fs.readFile(inputFile, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading CSV file:', err);
        return;
    }

    // Parse CSV data
    csv.parse(data, {
        columns: true,
        skip_empty_lines: true
    }, (err, records) => {
        if (err) {
            console.error('Error parsing CSV:', err);
            return;
        }

        // Transform data to required format
        const holders = records.map(record => ({
            address: record.HolderAddress,
            balance: parseInt(record.Balance)
        }));

        // Write to JSON file
        fs.writeFile(
            outputFile,
            JSON.stringify(holders, null, 2),
            'utf-8',
            (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                    return;
                }
                console.log('Successfully converted CSV to JSON!');
                console.log(`Output saved to: ${outputFile}`);
            }
        );
    });
});