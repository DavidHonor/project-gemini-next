const { config } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/sign-in",
                destination: "/api/auth/login",
                permanent: true,
            },
            {
                source: "/sign-up",
                destination: "/api/auth/register",
                permanent: true,
            },
            {
                source: "/sign-out",
                destination: "/api/auth/logout",
                permanent: true,
            },
        ];
    },
    images: {
        domains: ["storage.googleapis.com"],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;

        config.resolve.fallback = {
            ...config.resolve.fallback,

            fs: false,
        };
        return config;
    },
};

module.exports = nextConfig;
