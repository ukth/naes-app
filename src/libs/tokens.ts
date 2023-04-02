declare global {
  var accessToken: string | undefined;
  var refreshToken: string | undefined;
}

const accessToken = global.accessToken || "";
const refreshToken = global.refreshToken || "";

global.accessToken = accessToken;
global.refreshToken = refreshToken;

export { accessToken, refreshToken };
