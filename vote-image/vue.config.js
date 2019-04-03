module.exports = {
  devServer: {
    disableHostCheck: true,
    public: 'http://' + process.env.EXTERNAL_HOSTNAME,
  },
};
