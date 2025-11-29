/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for now since we have dynamic functionality
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
