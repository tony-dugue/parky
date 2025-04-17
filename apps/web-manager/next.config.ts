import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'basemaps.cartocdn.com' },
      //{ hostname: 'res.cloudinary.com' },
    ],
  },
}

export default nextConfig
