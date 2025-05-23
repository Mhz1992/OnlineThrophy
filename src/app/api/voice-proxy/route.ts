import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const externalUrl = searchParams.get('url');

    if (!externalUrl) {
        return NextResponse.json({ message: 'Missing URL parameter' }, { status: 400 });
    }

    try {
        const response = await fetch(externalUrl);

        if (!response.ok) {
            return NextResponse.json({ message: `Failed to fetch external resource: ${response.statusText}` }, { status: response.status });
        }

        // Get content type from the external response
        const contentType = response.headers.get('Content-Type');

        // Create a new response with the fetched body and content type
        const headers = new Headers();
        if (contentType) {
            headers.set('Content-Type', contentType);
        }
        // Add CORS headers to allow requests from your frontend origin
        headers.set('Access-Control-Allow-Origin', '*'); // Consider restricting this to your actual frontend origin in production
        headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Content-Type');

        return new NextResponse(response.body, { status: response.status, headers });

    } catch (error) {
        console.error('Error proxying voice data:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*'); // Consider restricting this to your actual frontend origin in production
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return new NextResponse(null, { status: 204, headers });
}
