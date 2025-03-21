const normaliseUrl = (url) => {
  const urlObj = new URL(url);

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }

  return hostPath;

  //   console.log('HostPath', hostPath.slice(-1));
};

// normaliseUrl('https://pomofocus.io/path/');

module.exports = { normaliseUrl };
