/** @type {import('next').NextConfig} */
module.export = {
  async headers() {
    return [
      {
        source: "/api/",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    const nextMiniCssExtractPluginIdx = config.plugins.findIndex(
      (p) => p?.constructor?.name === "NextMiniCssExtractPlugin"
    );
    //nextMiniCssExtractPluginIdx > -1 && config.plugins.splice(nextMiniCssExtractPluginIdx, 1);
    if (nextMiniCssExtractPluginIdx > -1) {
      config.plugins[nextMiniCssExtractPluginIdx].options = {
        filename: "static/css/[contenthash].css",
        ignoreOrder: true,
        experimentalUseImportModule: false,
        runtime: true,
        chunkFilename: "static/css/[contenthash].css",
      };
    }
    // config.plugins.push(new MiniCssExtractPlugin({
    //   experimentalUseImportModule: false
    // }));

    // config.module.rules.push({
    //       test: /\.css$/i,
    //       use: [MiniCssExtractPlugin.loader, "css-loader"],
    // });

    return config;
  },
};

module.exports = nextConfig;
