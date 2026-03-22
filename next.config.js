const isElectron = process.env.ELECTRON_BUILD === 'true';
const isCapacitor = process.env.CAPACITOR_BUILD === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // No basePath for Electron or Capacitor (uses file:// or mobile webview)
  ...(isElectron || isCapacitor ? {} : { basePath: '/mathacademy' }),
  images: { unoptimized: true },
  // Use relative asset prefix for Electron/Capacitor so file:// URLs resolve correctly
  ...(isElectron || isCapacitor ? { assetPrefix: './' } : {}),
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
}

module.exports = nextConfig
