import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // 'unsafe-inline' is required for Next.js hydration scripts and inline JSON-LD;
  // Three.js/Draco loads its decoder from gstatic and spins up a blob: worker.
  // 'wasm-unsafe-eval' compiles WebAssembly only (Draco decoder) — much narrower than 'unsafe-eval'.
  // 'unsafe-eval' is only needed in dev mode (React Refresh / debugging) — never shipped to production.
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://www.gstatic.com blob:${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  // blob: is required because GLTFLoader fetches embedded GLB textures via fetch() on blob: URLs.
  "connect-src 'self' https://www.gstatic.com blob:",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
