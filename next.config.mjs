/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,

  allowedDevOrigins: ["http://192.168.0.102:3000"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
