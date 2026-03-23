const fs = require("fs");
const path = require("path");
const { fileURLToPath, pathToFileURL } = require("url");

function stripBasePath(pathname = "/", basePath = "/learnnova") {
  const normalizedPath = normalizeRoutePath(pathname);
  const normalizedBasePath = normalizeRoutePath(basePath);

  if (normalizedBasePath === "/") {
    return normalizedPath;
  }

  if (normalizedPath === normalizedBasePath) {
    return "/";
  }

  if (normalizedPath.startsWith(`${normalizedBasePath}/`)) {
    const strippedPath = normalizedPath.slice(normalizedBasePath.length);
    return normalizeRoutePath(strippedPath || "/");
  }

  return normalizedPath;
}

function resolveContainedFilePath(rootDir, relativePath) {
  const normalizedRootDir = path.resolve(rootDir);
  const candidatePath = path.resolve(normalizedRootDir, relativePath);

  if (
    candidatePath !== normalizedRootDir &&
    !candidatePath.startsWith(`${normalizedRootDir}${path.sep}`)
  ) {
    return null;
  }

  return fs.existsSync(candidatePath) ? candidatePath : null;
}

function normalizeRoutePath(routePath = "/") {
  const decodedRoute = decodeURIComponent(routePath || "/");
  const normalizedRoute = decodedRoute.startsWith("/")
    ? decodedRoute
    : `/${decodedRoute}`;
  const collapsedRoute = normalizedRoute.replace(/\/{2,}/g, "/");

  if (collapsedRoute.length > 1 && collapsedRoute.endsWith("/")) {
    return collapsedRoute.slice(0, -1);
  }

  return collapsedRoute;
}

function normalizeDeepLinkRoute(parsedUrl) {
  const hostRoute = parsedUrl.host ? `/${parsedUrl.host}` : "";
  const pathname =
    parsedUrl.pathname && parsedUrl.pathname !== "/" ? parsedUrl.pathname : "";

  return normalizeRoutePath(`${hostRoute}${pathname}` || "/");
}

function buildAppLoadUrl({
  routePath = "/",
  search = "",
  isDev = false,
  outDir,
  devBaseUrl = "http://localhost:3000/learnnova",
}) {
  const normalizedRoute = normalizeRoutePath(routePath);
  const normalizedSearch = search || "";

  if (isDev) {
    return `${devBaseUrl}${
      normalizedRoute === "/" ? "" : normalizedRoute
    }${normalizedSearch}`;
  }

  const normalizedOutDir = path.resolve(outDir);
  const relativeHtmlPath =
    normalizedRoute === "/" ? "index.html" : `${normalizedRoute.replace(/^\/+/, "")}.html`;
  const requestedPath = path.join(normalizedOutDir, relativeHtmlPath);
  const fallbackPath = path.join(normalizedOutDir, "404.html");
  const resolvedPath = fs.existsSync(requestedPath) ? requestedPath : fallbackPath;

  return `${pathToFileURL(resolvedPath).toString()}${normalizedSearch}`;
}

function isAppNavigationUrl(
  rawUrl,
  { outDir, devBaseUrl = "http://localhost:3000/learnnova" }
) {
  try {
    const parsedUrl = new URL(rawUrl);

    if (parsedUrl.protocol === "file:") {
      const requestedFilePath = path.resolve(fileURLToPath(parsedUrl));
      const normalizedOutDir = path.resolve(outDir);

      return (
        requestedFilePath === normalizedOutDir ||
        requestedFilePath.startsWith(`${normalizedOutDir}${path.sep}`)
      );
    }

    const devUrl = new URL(devBaseUrl);
    const devPath = normalizeRoutePath(devUrl.pathname || "/");
    const isSameOrigin = parsedUrl.origin === devUrl.origin;
    const isWithinBasePath =
      devPath === "/"
        ? parsedUrl.pathname.startsWith("/")
        : parsedUrl.pathname === devPath ||
          parsedUrl.pathname.startsWith(`${devPath}/`);

    return isSameOrigin && isWithinBasePath;
  } catch {
    return false;
  }
}

function isSafeExternalUrl(rawUrl) {
  try {
    const parsedUrl = new URL(rawUrl);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function resolveFileNavigationRoute(rawUrl, { outDir }) {
  try {
    const parsedUrl = new URL(rawUrl);
    if (parsedUrl.protocol !== "file:") {
      return null;
    }

    const requestedFilePath = path.resolve(fileURLToPath(parsedUrl));
    const normalizedOutDir = path.resolve(outDir);

    if (
      requestedFilePath === normalizedOutDir ||
      requestedFilePath.startsWith(`${normalizedOutDir}${path.sep}`)
    ) {
      return null;
    }

    return stripBasePath(parsedUrl.pathname || "/");
  } catch {
    return null;
  }
}

function resolveFileAssetRequestTarget(
  rawUrl,
  { outDir, publicDir, basePath = "/learnnova" }
) {
  try {
    const parsedUrl = new URL(rawUrl);
    if (parsedUrl.protocol !== "file:") {
      return null;
    }

    const basePathRoute = normalizeRoutePath(basePath);
    const requestedPath = normalizeRoutePath(parsedUrl.pathname || "/");

    if (
      basePathRoute !== "/" &&
      requestedPath !== basePathRoute &&
      !requestedPath.startsWith(`${basePathRoute}/`)
    ) {
      return null;
    }

    const relativePath =
      basePathRoute === "/"
        ? requestedPath.replace(/^\/+/, "")
        : requestedPath.slice(basePathRoute.length).replace(/^\/+/, "");

    if (!relativePath) {
      return null;
    }

    const outPath = resolveContainedFilePath(outDir, relativePath);
    if (outPath) {
      return pathToFileURL(outPath).toString();
    }

    if (!publicDir) {
      return null;
    }

    const publicPath = resolveContainedFilePath(publicDir, relativePath);
    return publicPath ? pathToFileURL(publicPath).toString() : null;
  } catch {
    return null;
  }
}

function resolveAppNavigationTarget(
  rawUrl,
  { isDev = false, outDir, devBaseUrl = "http://localhost:3000/learnnova" }
) {
  if (isAppNavigationUrl(rawUrl, { outDir, devBaseUrl })) {
    return rawUrl;
  }

  const routePath = resolveFileNavigationRoute(rawUrl, { outDir });
  if (!routePath) {
    return null;
  }

  const parsedUrl = new URL(rawUrl);
  return buildAppLoadUrl({
    routePath,
    search: parsedUrl.search,
    isDev,
    outDir,
    devBaseUrl,
  });
}

module.exports = {
  buildAppLoadUrl,
  isAppNavigationUrl,
  isSafeExternalUrl,
  normalizeDeepLinkRoute,
  normalizeRoutePath,
  resolveAppNavigationTarget,
  resolveFileAssetRequestTarget,
  resolveFileNavigationRoute,
  stripBasePath,
};
