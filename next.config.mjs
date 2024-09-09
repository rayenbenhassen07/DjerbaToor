/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "75.119.130.218",
        port: "8055",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
