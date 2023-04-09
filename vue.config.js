// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/AnnotationWeb/'
      : '/',
    configureWebpack: {
      entry: {
        app: './app.js',
      },
    },
  }
  