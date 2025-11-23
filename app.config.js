// app.config.js
// Keep this file simple and avoid importing Metro internals here,
// since it is executed by Node when Expo reads the config.

module.exports = () => {
  return {
    expo: {
      doctor: {
        reactNativeDirectoryCheck: {
          exclude: ['react-native-chart-kit'],
        },
      },
    },
  };
};