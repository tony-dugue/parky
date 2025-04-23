import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'basemaps.cartocdn.com' },
      //{ hostname: 'res.cloudinary.com' },
      { hostname: 'lh3.googleusercontent.com' },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/file-upload/uploads/**',
        search: '',
      },
    ],
  },
}

export default nextConfig
