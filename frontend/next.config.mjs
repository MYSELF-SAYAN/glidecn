import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/transitions',
        destination: '/transition',
        permanent: false,
      },
      {
        source: '/transitions/:slug',
        destination: '/transition/:slug',
        permanent: false,
      },
      {
        source: '/docs/transitions',
        destination: '/transition',
        permanent: false,
      },
      {
        source: '/docs/transitions/:slug',
        destination: '/transition/:slug',
        permanent: false,
      },
    ];
  },
};

export default withMDX(nextConfig);

