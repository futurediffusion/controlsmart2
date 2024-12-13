import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
  },
  images: {
    domains: ['imagedelivery.net'], // Agregar el dominio aquí
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
