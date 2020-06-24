module.exports = {
  devServer: {
    proxy: {
      '/echo-api': {
        target: 'https://sepeach.com/',
        ws: false,
        changeOrigin: true
      },
      '/echo-static': {
        target: 'https://sepeach.com/',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
