/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tasfam.blueeconomysmz.go.tz',
      },
    ],
  },
};

module.exports = nextConfig;
