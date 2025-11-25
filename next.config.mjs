/** @types {import('next').NextConfig} */
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
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: process.env.IMAGE_SRC
      }
    ],
  },
}

export default nextConfig
