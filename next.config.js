//** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
      },
    ],
  },
  basePath: "/vm2",
};

module.exports = nextConfig;
