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
const clientId = env.SUMUP_CLIENT_ID;
const clientSecret = env.SUMUP_CLIENT_SECRET;

console.log("Testing SumUp Credentials...");

if (!clientId || !clientSecret) {
    console.error("Missing credentials");
    process.exit(1);
}

const data = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'products' // CRITICAL FIX
}).toString();

const options = {
    hostname: 'api.sumup.com',
    path: '/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (d) => { body += d; });
    res.on('end', () => {
        try {
            const json = JSON.parse(body);
            if (json.access_token) {
                console.log("SUCCESS! Access Token retrieved.");
                fetchMerchantProfile(json.access_token);
            } else {
                console.error("FAILURE! No access token.", body);
            }
        } catch (e) { console.error("JSON Parse Error", e); }
    });
});
req.end(data);

function fetchRequest(path, token, label) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'api.sumup.com',
            path: path,
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const r = https.request(options, (res) => {
            let b = '';
            res.on('data', (d) => b += d);
            res.on('end', () => {
                console.log(`\n[${label}] Status: ${res.statusCode}`);
                if (res.statusCode === 200) {
                    console.log(`[${label}] Success.`);
                    resolve(JSON.parse(b));
                } else {
                    console.log(`[${label}] Failed: ${b.substring(0, 150)}...`);
                    resolve(null);
                }
            });
        });
        r.end();
    });
}

async function fetchMerchantProfile(token) {
    // 1. Try /v0.1/me
    const me = await fetchRequest('/v0.1/me', token, 'Me Endpoint');

    // 2. Try /v0.1/me/products
    await fetchRequest('/v0.1/me/products', token, 'Me Products');

    if (me && me.merchant_profile && me.merchant_profile.merchant_code) {
        const code = me.merchant_profile.merchant_code;
        console.log(`Found Merchant Code: ${code}`);
        // 3. Try /v0.1/merchants/{code}/products
        await fetchRequest(`/v0.1/merchants/${code}/products`, token, `Merchant ${code} Products`);
    }
}
