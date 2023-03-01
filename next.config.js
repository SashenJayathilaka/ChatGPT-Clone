/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["drive.google.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
