import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: "No authorization code provided" }, { status: 400 });
    }

    const clientId = process.env.SUMUP_CLIENT_ID;
    const clientSecret = process.env.SUMUP_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sumup/auth/callback`;

    if (!clientId || !clientSecret) {
        return NextResponse.json({ error: "Missing Client Credentials" }, { status: 500 });
    }

    try {
        // Exchange code for token
        const tokenRes = await fetch("https://api.sumup.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                redirect_uri: redirectUri,
            }),
        });

        const tokenData = await tokenRes.json();

        if (!tokenRes.ok) {
            console.error("Token Exchange Error:", tokenData);
            return NextResponse.json({ error: "Failed to exchange token", details: tokenData }, { status: 500 });
        }

        // TODO: Save token securely (in a real app, DB/Redis. Here, we might use a temp file or just env fallback)
        // For this persistent task, we will write to a JSON file to persist across restarts
        const fs = require('fs');
        const path = require('path');
        const tokenPath = path.join(process.cwd(), 'data', 'sumup-token.json');

        // Add timestamp to know when to refresh
        tokenData.received_at = Date.now();
        fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));

        return NextResponse.redirect(new URL('/?login=success', request.url));

    } catch (error) {
        console.error("OAuth Callback Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
