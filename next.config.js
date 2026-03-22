const isElectron = process.env.ELECTRON_BUILD === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  ...(isElectron ? {} : { basePath: '/mathacademy' }),
  images: { unoptimized: true },
  // Use relative asset prefix for Electron so file:// URLs resolve correctly
  ...(isElectron ? { assetPrefix: './' } : {}),
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
}

module.exports = nextConfig
