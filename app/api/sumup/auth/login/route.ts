import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.SUMUP_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sumup/auth/callback`;

    if (!clientId) {
        return NextResponse.json({ error: 'Missing SUMUP_CLIENT_ID' }, { status: 500 });
    }

    // Re-enabling products scope now that user enabled it in Dashboard
    const scopes = ['products'].join(' ');


    const sumupLoginUrl = `https://api.sumup.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;


    console.log("[Login Route] Generated URL:", sumupLoginUrl);


    return NextResponse.redirect(sumupLoginUrl);
}
