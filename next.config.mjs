/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/api/questions': ['./src/data/grade*/*.json'],
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
