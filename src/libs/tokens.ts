declare global {
  var accessToken: string | undefined;
  var refreshToken: string | undefined;

  var windowWidth: number;
  var windowHeight: number;
}

const accessToken = global.accessToken || "";
const refreshToken = global.refreshToken || "";

const windowWidth = global.windowWidth || 390;
const windowHeight = global.windowHeight || 844;

global.accessToken = accessToken;
global.refreshToken = refreshToken;

global.windowWidth = windowWidth;
global.windowHeight = windowHeight;

export { accessToken, refreshToken };
