const {
  loaderByName,
  getLoader
} = require("@craco/craco");


module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const lm = getLoader(webpackConfig, loaderByName('babel-loader'));
      const loader = lm.match.loader;

      const nl = {
        test: loader.test,
        include: loader.include,
        rules: [
          {
            loader: loader.loader,
            options: {
              presets: [loader.options.presets[0], 'linaria/babel']
            }
          },
          {
            loader: 'linaria/loader',
            options: {
              cacheDirectory: 'src/.linaria_cache',
              sourceMap: process.env.NODE_ENV !== 'production',
              babelOptions: {
                presets: loader.options.presets
              }
            }
          }
        ]
      }
      webpackConfig.module.rules[2].oneOf[1] = nl;
      return webpackConfig;
    }
  }
}
