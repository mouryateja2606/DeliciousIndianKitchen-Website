const fs = require('fs');
const path = require('path');
const https = require('https');

function loadEnv() {
    try {
        const envPath = path.join(__dirname, '..', '.env.local');
        const content = fs.readFileSync(envPath, 'utf8');
        const env = {};
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
        });
        return env;
    } catch (e) { return {}; }
}

const env = loadEnv();
const apiKey = env.SUMUP_API_KEY;

console.log("Testing SumUp API Key...");
console.log(`API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'MISSING'}`);

if (!apiKey) {
    console.error("Missing SUMUP_API_KEY in .env.local");
    process.exit(1);
}

function fetchRequest(path, label) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'api.sumup.com',
            path: path,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        };
        const r = https.request(options, (res) => {
            let b = '';
            res.on('data', (d) => b += d);
            res.on('end', () => {
                console.log(`\n[${label}] Status: ${res.statusCode}`);
                if (res.statusCode === 200) {
                    console.log(`[${label}] Success.`);
                    try {
                        const json = JSON.parse(b);
                        resolve(json);
                    } catch (e) {
                        console.log(`[${label}] JSON Parse Error`);
                        resolve(null);
                    }
                } else {
                    console.log(`[${label}] Failed: ${b.substring(0, 300)}...`);
                    resolve(null);
                }
            });
        });
        r.end();
    });
}

async function run() {
    // 1. Try /v0.1/me to get merchant code
    console.log("Fetching /v0.1/me...");
    const me = await fetchRequest('/v0.1/me', 'Me Endpoint');

    if (me && me.merchant_profile && me.merchant_profile.merchant_code) {
        const code = me.merchant_profile.merchant_code;
        console.log(`\n> Found Merchant Code: ${code}`);

        // 2. Try /v0.1/merchants/{code}/products
        console.log(`Fetching /v0.1/merchants/${code}/products...`);
        await fetchRequest(`/v0.1/merchants/${code}/products`, `Merchant Products`);
    } else {
        console.log("\nCould not retrieve merchant code from /me endpoint.");
    }
}

run();
