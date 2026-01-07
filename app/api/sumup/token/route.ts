import { NextResponse } from 'next/server';

export async function POST() {
    const clientId = process.env.SUMUP_CLIENT_ID;
    const clientSecret = process.env.SUMUP_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return NextResponse.json(
            { error: "Missing SumUp configuration" },
            { status: 500 }
        );
    }

    try {
        const response = await fetch("https://api.sumup.com/token", {
            method: "POST",
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: clientId,
                client_secret: clientSecret,
                scope: "products",
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("SumUp Token Error:", errorText);
            return NextResponse.json(
                { error: "Failed to fetch token from SumUp", details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("SumUp Token Exception:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
