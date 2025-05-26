import config from "@/lib/config";

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');

    if (!domain) {
        return new Response('Missing domain parameter', { status: 400 });
    }

    const logoUrl = `https://img.logo.dev/${domain}.com?token=${config.env.logo}&retina=true`;

    try {
        const response = await fetch(logoUrl);

        if (!response.ok) {
            return new Response('Failed to fetch image', { status: response.status });
        }

        const contentType = response.headers.get('content-type') || 'image/png';
        const imageBuffer = await response.arrayBuffer();

        return new Response(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400', // optional caching
            },
        });
    } catch (err) {
        return new Response(`Error fetching image:${err}`, { status: 500 });
    }
}

