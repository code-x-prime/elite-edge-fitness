/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-67f953912205445f932ab892164f22e5.r2.dev',
      },
    ],
  },
};

export default nextConfig;
