module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
            @import "@/scss/utilities.scss";
            `,
      },
    },
  },
};
