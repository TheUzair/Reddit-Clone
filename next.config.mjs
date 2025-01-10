/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Allow all domains temporarily
      }
    ],
    unoptimized: true, // Add this line to disable optimization
  },
};

export default nextConfig;