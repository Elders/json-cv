module.exports = function getURLSegments(url) {
  const matches = url.match(/(https?):\/\/(.+):(\d\d\d\d)/);

  return {
    protocol: matches[1],
    hostName: matches[2],
    port: matches[3],
  };
};
