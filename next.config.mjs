/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'product-image.kurly.com',
      },
      {
        protocol: 'https',
        hostname: 'img-cf.kurly.com',
      },
      {
        protocol: 'https',
        hostname: 'img.kurly.com',
      },
    ],
  },
}

export default nextConfig
