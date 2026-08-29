/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
