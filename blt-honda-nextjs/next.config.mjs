/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      {
        source: "/iletisim",
        destination: "/",
        permanent: true,
      },
      {
        source: "/iletisim/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;