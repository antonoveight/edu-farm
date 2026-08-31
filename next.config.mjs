/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['better-sqlite3'],
  outputFileTracingIncludes: {
    '/*': ['./src/data/grade*/*.json'],
  },
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/game/whitebook.html',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
