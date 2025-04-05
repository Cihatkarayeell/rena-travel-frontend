const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  src: 'src',
  dist: 'dist',
  version: 100,

  html: {
    src: 'src/html/pages/*.html',
    watch: 'src/html/**/*.html',
    dist: 'dist'
  },

  sass: {
    src: 'src/sass/*.{sass,scss}',
    watch: 'src/sass/**/*.{sass,scss}',
    dist: 'dist/css'
  },

  js: {
    src: 'src/js/*.js',
    watch: 'src/js/**/*.js',
    dist: 'dist/js'
  },

  img: {
    src: 'src/img/**/*.*',
    watch: 'src/img/**/*.*',
    dist: 'img'
  },

  font: {
    src: 'src/font/**/*.*',
    watch: 'src/font/**/*.*',
    dist: 'font'
  },

  rootFiles: {
    src: 'src/root-files/**/*.*',
    watch: 'src/root-files/**/*.*',
    dist: '.'
  }
};

// HTML sayfalarını bul ve HtmlWebpackPlugin örneklerini oluştur
const pages = fs.readdirSync(path.join(__dirname, 'src/html/pages'))
  .filter(file => file.endsWith('.html'));

const htmlPlugins = pages.map(file => {
  return new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/html/pages', file),
    filename: file,
    inject: true,
    chunks: ['main'],
    minify: !isDev ? {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    } : false
  });
});

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: path.resolve(__dirname, config.js.src.replace('*.js', 'main.js'))
  },
  output: {
    path: path.resolve(__dirname, config.dist),
    filename: 'assets/js/[name].js',
    clean: !isDev,
    publicPath: ''
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    static: {
      directory: path.join(__dirname, config.dist),
    },
    historyApiFallback: true,
    compress: true,
    hot: true,
    liveReload: true,
    watchFiles: {
      paths: [
        'src/**/*.html',
        'src/**/*.scss',
        'src/**/*.js'
      ],
      options: {
        usePolling: true
      }
    },
    port: 'auto',
    open: true,
    host: 'localhost',
    client: {
      overlay: true,
      progress: true
    },
    devMiddleware: {
      writeToDisk: true
    },
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      const port = devServer.server.address().port;
      console.log('Listening on port:', port);
    }
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'dist/img'),
          noErrorOnMissing: true
        },
        {
          from: 'src/root-files',
          to: path.resolve(__dirname, config.dist),
          noErrorOnMissing: true
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass-embedded'),
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            if (pathData.filename.includes('favicon')) {
              return '[name][ext]';
            }
            return 'assets/img/[name][ext]';
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: !isDev,
              esModule: false,
              sources: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src'
                  },
                  {
                    tag: 'link',
                    attribute: 'href',
                    type: 'src'
                  }
                ]
              }
            }
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [
                path.resolve(__dirname, 'src/html'),
                path.resolve(__dirname, 'src/html/layout'),
                path.resolve(__dirname, 'src/html/partial')
              ],
              context: {
                isDev: isDev
              },
              jinjaCompat: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: 'js/vendor.[contenthash].js'
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
