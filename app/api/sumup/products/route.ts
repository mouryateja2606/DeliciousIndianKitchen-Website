import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Serve from the real SumUp catalog snapshot
        const jsonPath = path.join(process.cwd(), 'data', 'sumup-products.json');
        if (fs.existsSync(jsonPath)) {
            const fileData = fs.readFileSync(jsonPath, 'utf8');
            const data = JSON.parse(fileData);
            // data already has { items: [...], items_count: 50 } structure
            return NextResponse.json(data);
        }

        return NextResponse.json({ items: [] });
    } catch (error) {
        console.error("Local Menu Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
