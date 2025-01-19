/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: {
      protocol: "https",
      hostname: "sh-s3-images.s3.us-east-1.amazonaws.com",
      port: "",
      pathname: "/**",
    },
  },
};

export default nextConfig;
