/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/api/questions': ['./src/data/grade*/*.json'],
  },
};

export default nextConfig;
