// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
import path from 'path';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  reactStrictMode: true,
  webpack: (config, { }) => {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};
