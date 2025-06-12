/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        serverActions: {
            bodySizeLimit: '8mb',
        },
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: ['@svgr/webpack'],
            },
        );
        fileLoaderRule.exclude = /\.svg$/i;
        return config;
    },
    env: {
        REACT_QUERY_DEV_TOOLS: process.env.REACT_QUERY_DEV_TOOLS,
        BACKEND_CORE_URL: process.env.BACKEND_CORE_URL,
        DEBUG: process.env.DEBUG,
        GIT_TAG: process.env.GIT_TAG,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    },
    async rewrites() {
        return [
            {
                source: '/audio-proxy/:path*',
                destination: 'http://farsi.voiceoversamples.com/:path*',
            },
            // NEW: Proxy backend API calls to bypass CORS
        ];
    },
};

export default nextConfig;
