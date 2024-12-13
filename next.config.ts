import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRefresh: false,
  },
  images: {
    domains: ['imagedelivery.net'], // Agregar el dominio aquí
  },
};

export default nextConfig;
