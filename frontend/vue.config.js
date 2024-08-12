const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
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
