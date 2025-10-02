/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "khabgimuwkhexobpwhxs.supabase.co",
      "waagstbitqshrscmxriq.supabase.co",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              process.env.NODE_ENV === "development"
                ? "default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data:;"
                : "default-src 'self'; img-src 'self' https://waagstbitqshrscmxriq.supabase.co data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://js.stripe.com; connect-src 'self' https://api.stripe.com; frame-src 'self' https://checkout.stripe.com https://js.stripe.com;",
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,       // only when imported from JS/TS
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
