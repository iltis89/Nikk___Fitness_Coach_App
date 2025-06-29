/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimierungen für Build-Performance
  swcMinify: true,
  
  // TypeScript und ESLint Optimierungen
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Webpack-Optimierungen für Hero Icons
  webpack: (config) => {
    // Disable barrel optimization for hero icons to prevent timeout
    config.module.rules.push({
      test: /@heroicons[\\/]react/,
      sideEffects: false,
    });
    
    return config;
  },
  
  // Output Optimierungen
  poweredByHeader: false,
  compress: true,
  
  // Modularize Imports to fix Hero Icons barrel optimization
  modularizeImports: {
    '@heroicons/react/24/outline': {
      transform: '@heroicons/react/24/outline/{{member}}',
    },
    '@heroicons/react/24/solid': {
      transform: '@heroicons/react/24/solid/{{member}}',
    },
  },
};

export default nextConfig;