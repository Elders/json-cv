/** @type {import('next').NextConfig} */
const getURLSegments = require("./helpers/getURLSegments");

const { protocol, hostname, port } = getURLSegments(process.env.HOST);

const nextConfig = {
  experimental: {
    appDir: true,
  },

  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   config.optimization.minimize = false;
  //   return config
  // },

  images: {
    remotePatterns: [
      {
        protocol,
        hostname,
        port,
      },
    ],
  },
};

module.exports = nextConfig;
