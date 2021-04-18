module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript/' : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/assets/scss/variables.scss";',
      },
    },
  },
};
