const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  swcMinify: true,
  productionBrowserSourceMaps: false,
});
