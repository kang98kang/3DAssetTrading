/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKGROUND_COLOR_PRIMARY: "#808080",
    NEXT_PUBLIC_BACKGROUND_COLOR_SECONDARY: "#2b2b2b",
    NEXT_PUBLIC_BACKGROUND_COLOR_TERTIARY: "#3a3a3a",
    NEXT_PUBLIC_ACCENT_COLOR_PRIMARY: "#97bdba",
    NEXT_PUBLIC_TEXT_COLOR_PRIMARY: "white",
    NEXT_PUBLIC_TEXT_COLOR_SECONDARY: "black",
  },
  async rewrites() {
    return [
      {
        source: "/api/minio/:path*",
        destination: `http://${process.env.DB_HOST}:9000/test/:path*`,
      },
    ];
  },
};

export default nextConfig;
