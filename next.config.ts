import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
 
};
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
  },
}

export default nextConfig;
