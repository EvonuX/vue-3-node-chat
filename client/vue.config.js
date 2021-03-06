module.exports = {
  devServer: {
    proxy: {
      '/socket': {
        target:
          process.env.NODE_ENV === 'production'
            ? 'https://v3-node-chat.herokuapp.com/'
            : 'http://localhost:5000/'
      }
    }
  }
}
