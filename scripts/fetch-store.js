const https = require('https');

const subdomain = "delicious-indian-kitchen";
const endpoints = [
    `https://api.sumupstore.com/v1/shops/${subdomain}/products`,
    `https://${subdomain}.sumupstore.com/api/products`,
    `https://${subdomain}.sumupstore.com/_next/data/latest/produkte.json` // Common Next.js pattern
];

console.log(`Probing API endpoints for ${subdomain}...`);

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
    }
};

function checkEndpoint(url) {
    return new Promise((resolve) => {
        console.log(`\nChecking: ${url}`);
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode}`);
                if (res.statusCode === 200) {
                    try {
                        const json = JSON.parse(data);
                        console.log("SUCCESS! Valid JSON response.");
                        console.log("Keys:", Object.keys(json));
                        if (json.data || Array.isArray(json)) {
                            console.log("Looks like product data!");
                            console.log(JSON.stringify(json).substring(0, 200));
                        }
                    } catch (e) {
                        console.log("Not JSON:", data.substring(0, 100));
                    }
                } else {
                    console.log("Failed.");
                }
                resolve();
            });
        }).on('error', (e) => {
            console.log("Error:", e.message);
            resolve();
        });
    });
}

async function run() {
    for (const url of endpoints) {
        await checkEndpoint(url);
    }
}

run();
