module.exports = {
  devServer: {
    proxy: {
      '/echo-api': {
        target: 'https://www.sepeach.com/',
        ws: false,
        changeOrigin: true
      },
      '/echo-static': {
        target: 'https://www.sepeach.com/',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
