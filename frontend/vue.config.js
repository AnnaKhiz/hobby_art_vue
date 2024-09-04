const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: '/portfolio/hobby-art-new',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? 'https://anna-khizhniak.site/portfolio/hobby-art-new/'
  //   : '/',

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },

  // devServer: {
  //   proxy: 'http://localhost:5000',
  // }
})
