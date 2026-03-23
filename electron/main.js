const { app, BrowserWindow, Menu, shell, dialog, MenuItem, powerMonitor, Tray, nativeImage, ipcMain, Notification, session } = require("electron");
const path = require("path");
const fs = require("fs");
const {
  buildAppLoadUrl,
  isSafeExternalUrl,
  normalizeDeepLinkRoute,
  resolveAppNavigationTarget,
  resolveFileAssetRequestTarget,
} = require("./url-utils");

let mainWindow;
let loadingWindow;
let tray = null;
let assetRedirectsRegistered = false;

const DEV_BASE_URL = process.env.ELECTRON_DEV_BASE_URL || "http://localhost:3000";
const APP_BASE_PATH = "/";
const OUT_DIR = path.join(__dirname, "../out");
const PUBLIC_DIR = path.join(__dirname, "../public");

// Single instance lock - prevent multiple app instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  // Another instance is already running, quit this one
  app.quit();
} else {
  // This is the first instance, handle second-instance events
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, focus our window instead
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();

      // Handle the protocol URL if provided
      const protocolUrl = commandLine.find((arg) => arg.startsWith("learnnova://"));
      if (protocolUrl) {
        handleProtocolUrl(protocolUrl);
      }
    }
  });
}

// Window state file path
const statePath = path.join(app.getPath("userData"), "window-state.json");

// Default window state
const defaultWindowState = {
  width: 1280,
  height: 900,
  x: undefined,
  y: undefined,
  isMaximized: false,
};

// Load window state from disk
function loadWindowState() {
  try {
    if (fs.existsSync(statePath)) {
      const state = JSON.parse(fs.readFileSync(statePath, "utf-8"));
      return { ...defaultWindowState, ...state };
    }
  } catch (error) {
    console.error("Failed to load window state:", error);
  }
  return defaultWindowState;
}

// Save window state to disk
function saveWindowState() {
  if (!mainWindow) return;

  try {
    const state = {
      width: mainWindow.getBounds().width,
      height: mainWindow.getBounds().height,
      x: mainWindow.getBounds().x,
      y: mainWindow.getBounds().y,
      isMaximized: mainWindow.isMaximized(),
    };
    fs.writeFileSync(statePath, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save window state:", error);
  }
}

function openExternalUrl(url) {
  if (!isSafeExternalUrl(url)) {
    console.warn("Blocked external URL:", url);
    return;
  }

  shell.openExternal(url);
}

function getRendererNavigationTarget(rawUrl) {
  const isDev = process.env.ELECTRON_DEV === "true";
  return resolveAppNavigationTarget(rawUrl, {
    isDev,
    outDir: OUT_DIR,
    devBaseUrl: DEV_BASE_URL,
  });
}

function registerFileProtocolAssetRedirects() {
  if (assetRedirectsRegistered) {
    return;
  }

  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ["file://*/*"] },
    (details, callback) => {
      const redirectURL = resolveFileAssetRequestTarget(details.url, {
        outDir: OUT_DIR,
        publicDir: PUBLIC_DIR,
        basePath: APP_BASE_PATH,
      });

      if (redirectURL && redirectURL !== details.url) {
        callback({ redirectURL });
        return;
      }

      callback({});
    }
  );

  assetRedirectsRegistered = true;
}

// Create loading window
function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false,
    transparent: true,
    resizable: false,
    center: true,
    backgroundColor: "#0f172a",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  });

  loadingWindow.loadURL(
    `data:text/html,
    <html>
      <head>
        <style>
          body {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #0f172a;
            color: #fbbf24;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .loader {
            text-align: center;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #334155;
            border-top-color: #fbbf24;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="loader">
          <div class="spinner"></div>
          <div>Loading LearnNova...</div>
        </div>
      </body>
    </html>`
  );

  return loadingWindow;
}

// Create application menu
function createMenu() {
  const isMac = process.platform === "darwin";

  const template = [
    // App menu (macOS only)
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    // File menu
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }],
    },
    // Edit menu
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    // View menu
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    // Window menu
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]),
      ],
    },
    // Help menu
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            await shell.openExternal("https://learnnova.com");
          },
        },
        {
          label: "Report Issue",
          click: async () => {
            await shell.openExternal(
              "https://github.com/learnnova/learnnova/issues"
            );
          },
        },
        ...(!isMac
          ? [
              { type: "separator" },
              {
                label: "About",
                click: () => {
                  dialog.showMessageBox(mainWindow, {
                    type: "info",
                    title: `About ${app.name}`,
                    message: app.name,
                    detail: `Version: ${app.getVersion()}\n\nAI-powered adaptive learning platform for mathematics, machine learning, and software engineering.`,
                    buttons: ["OK"],
                  });
                },
              },
            ]
          : []),
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Create system tray icon
function createTray() {
  // Try PNG first (nativeImage doesn't support SVG)
  const pngIconPath = path.join(__dirname, "../public/icon.png");
  const svgIconPath = path.join(__dirname, "../public/favicon.svg");
  const iconPath = fs.existsSync(pngIconPath) ? pngIconPath : svgIconPath;

  // Create tray icon
  const trayIcon = nativeImage.createFromPath(iconPath);

  if (trayIcon.isEmpty()) {
    // Fallback: create a simple 16x16 colored icon
    const fallbackIcon = nativeImage.createFromBuffer(
      Buffer.alloc(16 * 16 * 4, 0xff) // 16x16 RGBA white
    , { width: 16, height: 16 });
    tray = new Tray(fallbackIcon);
  } else {
    tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));
  }

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open LearnNova",
      click: () => {
        if (mainWindow) {
          if (mainWindow.isMinimized()) mainWindow.restore();
          mainWindow.show();
          mainWindow.focus();
        }
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("LearnNova");
  tray.setContextMenu(contextMenu);

  // Double-click tray icon to show window
  tray.on("double-click", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });

  return tray;
}

// Taskbar progress indicator
function setProgress(progress) {
  if (mainWindow) {
    // Progress should be between 0 and 1, or -1 to hide
    if (progress >= 0 && progress <= 1) {
      mainWindow.setProgressBar(progress);
    } else if (progress === -1) {
      mainWindow.setProgressBar(-1);
    }
  }
}

// Badge count (macOS only)
function setBadgeCount(count) {
  if (process.platform === "darwin") {
    app.dock.setBadge(count > 0 ? count.toString() : "");
  }
}

// Recent documents
function addRecentDocument(filePath) {
  app.addRecentDocument(filePath);
}

function clearRecentDocuments() {
  app.clearRecentDocuments();
}

function createWindow() {
  const windowState = loadWindowState();

  // Use PNG icon if available (SVG not supported on all platforms)
  const pngIconPath = path.join(__dirname, "../public/icon.png");
  const svgIconPath = path.join(__dirname, "../public/favicon.svg");
  const iconPath = fs.existsSync(pngIconPath) ? pngIconPath : svgIconPath;

  mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    minWidth: 800,
    minHeight: 600,
    title: "LearnNova",
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      spellcheck: true,
    },
    backgroundColor: "#0f172a",
    show: false,
  });

  // Restore maximized state
  if (windowState.isMaximized) {
    mainWindow.maximize();
  }

  // Show window when ready to avoid white flash
  mainWindow.once("ready-to-show", () => {
    if (loadingWindow) {
      loadingWindow.close();
      loadingWindow = null;
    }
    mainWindow.show();
  });

  // Save window state on close and resize
  mainWindow.on("close", saveWindowState);
  mainWindow.on("resize", saveWindowState);
  mainWindow.on("move", saveWindowState);
  mainWindow.on("maximize", saveWindowState);
  mainWindow.on("unmaximize", saveWindowState);

  // Handle external links - open in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const targetUrl = getRendererNavigationTarget(url);
    if (targetUrl) {
      if (targetUrl !== url) {
        mainWindow.loadURL(targetUrl);
      }
      return { action: "deny" };
    }

    openExternalUrl(url);
    return { action: "deny" };
  });

  // Handle navigation to external URLs
  mainWindow.webContents.on("will-navigate", (event, url) => {
    const targetUrl = getRendererNavigationTarget(url);
    if (!targetUrl) {
      event.preventDefault();
      openExternalUrl(url);
      return;
    }

    if (targetUrl !== url) {
      event.preventDefault();
      mainWindow.loadURL(targetUrl);
    }
  });

  // Handle load errors
  mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    if (errorCode !== -3) { // Ignore aborted loads
      dialog.showErrorBox("Load Error", `Failed to load: ${errorDescription}`);
    }
  });

  // Context menu for right-click
  mainWindow.webContents.on("context-menu", (event, params) => {
    const menu = new Menu();

    // Text selection context menu
    if (params.selectionText) {
      menu.append(new MenuItem({ role: "copy" }));
      menu.append(new MenuItem({ role: "cut" }));
      menu.append(new MenuItem({ role: "paste" }));
      menu.append(new MenuItem({ type: "separator" }));
      menu.append(new MenuItem({ role: "selectAll" }));
    }
    // Link context menu
    else if (params.linkURL) {
      menu.append(
        new MenuItem({
          label: "Open Link in Browser",
          click: () => openExternalUrl(params.linkURL),
        })
      );
      menu.append(
        new MenuItem({
          label: "Copy Link Address",
          click: () => {
            require("electron").clipboard.writeText(params.linkURL);
          },
        })
      );
    }
    // Image context menu
    else if (params.hasImageContents) {
      menu.append(
        new MenuItem({
          label: "Copy Image",
          click: () => mainWindow.webContents.copyImageAt(params.x, params.y),
        })
      );
      if (params.srcURL) {
        menu.append(
          new MenuItem({
            label: "Open Image in Browser",
            click: () => openExternalUrl(params.srcURL),
          })
        );
      }
    }
    // Default context menu
    else {
      menu.append(new MenuItem({ role: "reload" }));
      menu.append(new MenuItem({ role: "paste" }));
      menu.append(new MenuItem({ type: "separator" }));
      menu.append(new MenuItem({ role: "inspect" }));
    }

    menu.popup({ window: mainWindow, x: params.x, y: params.y });
  });

  // Keyboard shortcuts for navigation
  mainWindow.webContents.on("before-input-event", (event, input) => {
    // Alt+Left = Back
    if (input.alt && input.key === "ArrowLeft") {
      if (mainWindow.webContents.canGoBack()) {
        mainWindow.webContents.goBack();
        event.preventDefault();
      }
    }
    // Alt+Right = Forward
    if (input.alt && input.key === "ArrowRight") {
      if (mainWindow.webContents.canGoForward()) {
        mainWindow.webContents.goForward();
        event.preventDefault();
      }
    }
  });

  const isDev = process.env.ELECTRON_DEV === "true";
  const shouldOpenDevTools =
    isDev && process.env.ELECTRON_DISABLE_DEVTOOLS !== "true";

  if (isDev) {
    // Development: load from Next.js dev server
    mainWindow.loadURL(DEV_BASE_URL);
    if (shouldOpenDevTools) {
      mainWindow.webContents.openDevTools();
    }
  } else {
    // Production: load from static export
    // Check if out directory exists
    if (!fs.existsSync(OUT_DIR)) {
      dialog.showErrorBox(
        "Build Error",
        "Application not built. Please run 'pnpm build' first."
      );
      app.quit();
      return;
    }

    const indexPath = path.join(OUT_DIR, "index.html");
    mainWindow.loadFile(indexPath);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Register protocol handler for deep links
  const protocolSuccess = app.setAsDefaultProtocolClient("learnnova");
  if (!protocolSuccess) {
    console.error("Failed to register protocol handler");
  }

  registerFileProtocolAssetRedirects();
  // IPC handler for notifications from renderer via preload
  ipcMain.on("show-notification", (_event, payload) => {
    if (
      !payload ||
      typeof payload.title !== "string" ||
      (payload.body !== undefined && typeof payload.body !== "string")
    ) {
      return;
    }

    if (Notification.isSupported()) {
      const { title, body = "", silent = false } = payload;
      new Notification({ title, body, silent }).show();
    }
  });

  // Database IPC handlers
  const database = require("./database");

  ipcMain.handle("db:load-user-data", () => {
    return database.loadUserData();
  });

  ipcMain.handle("db:record-answer", (_event, { kpSlug, topicSlug, totalKpsInTopic, correct, questionId }) => {
    return database.recordAnswer(kpSlug, topicSlug, totalKpsInTopic, correct, questionId);
  });

  createMenu();
  createLoadingWindow();
  createWindow();
  createTray();
  setupDownloadManager();
  setupAutoUpdater();
  setupDockMenu();
  setupJumpList();

  // Power monitor - handle system power events
  powerMonitor.on("suspend", () => {
    console.log("System suspending...");
    saveWindowState();
  });

  powerMonitor.on("resume", () => {
    console.log("System resuming...");
  });

  powerMonitor.on("lock-screen", () => {
    console.log("Screen locked...");
    saveWindowState();
  });

  powerMonitor.on("unlock-screen", () => {
    console.log("Screen unlocked...");
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createLoadingWindow();
      createWindow();
    }
  });
});

// Handle protocol links (macOS)
app.on("open-url", (event, url) => {
  event.preventDefault();
  handleProtocolUrl(url);
});

// Parse and handle protocol URLs
function handleProtocolUrl(urlString) {
  try {
    const parsedUrl = new URL(urlString);
    if (parsedUrl.protocol === "learnnova:") {
      const routePath = normalizeDeepLinkRoute(parsedUrl);
      const search = parsedUrl.search;

      // Navigate to the path in the app
      if (mainWindow) {
        const isDev = process.env.ELECTRON_DEV === "true";
        const fullUrl = buildAppLoadUrl({
          routePath,
          search,
          isDev,
          outDir: OUT_DIR,
          devBaseUrl: DEV_BASE_URL,
        });
        mainWindow.loadURL(fullUrl);
      }
    }
  } catch (error) {
    console.error("Failed to parse protocol URL:", error);
  }
}

// Download manager
function setupDownloadManager() {
  const downloads = new Map();

  mainWindow.webContents.session.on("will-download", (event, item, webContents) => {
    const downloadId = Date.now().toString();

    // Set save path (user's Downloads folder)
    const fileName = item.getFilename();
    const savePath = path.join(app.getPath("downloads"), fileName);
    item.setSavePath(savePath);

    // Track download progress
    downloads.set(downloadId, {
      fileName,
      savePath,
      progress: 0,
      state: "progressing",
    });

    item.on("updated", (event, state) => {
      if (state === "progressing") {
        const progress = item.getReceivedBytes() / item.getTotalBytes();
        downloads.set(downloadId, { ...downloads.get(downloadId), progress });
        setProgress(progress); // Show in taskbar
      }
    });

    item.once("done", (event, state) => {
      const download = downloads.get(downloadId);
      downloads.delete(downloadId);
      setProgress(-1); // Hide taskbar progress

      if (state === "completed") {
        // Show notification
        const { Notification } = require("electron");
        if (Notification.isSupported()) {
          new Notification({
            title: "Download Complete",
            body: `${fileName} has been downloaded.`,
          }).show();
        }
      } else {
        dialog.showErrorBox("Download Failed", `${fileName} failed to download.`);
      }
    });
  });

  return downloads;
}

// Auto-updater configuration (placeholder for electron-updater)
function setupAutoUpdater() {
  // This is a placeholder for auto-updater integration
  // To enable, install electron-updater and uncomment:
  //
  // const { autoUpdater } = require('electron-updater');
  //
  // autoUpdater.checkForUpdatesAndNotify();
  //
  // autoUpdater.on('update-available', () => {
  //   dialog.showMessageBox(mainWindow, {
  //     type: 'info',
  //     title: 'Update Available',
  //     message: 'A new version is available. It will be downloaded in the background.',
  //     buttons: ['OK']
  //   });
  // });
  //
  // autoUpdater.on('update-downloaded', () => {
  //   dialog.showMessageBox(mainWindow, {
  //     type: 'info',
  //     title: 'Update Ready',
  //     message: 'A new version is ready. Restart to install.',
  //     buttons: ['Restart', 'Later']
  //   }).then((result) => {
  //     if (result.response === 0) {
  //       autoUpdater.quitAndInstall();
  //     }
  //   });
  // });

  console.log("Auto-updater placeholder ready");
}

// macOS Dock menu
function setupDockMenu() {
  if (process.platform !== "darwin") return;

  const dockMenu = Menu.buildFromTemplate([
    {
      label: "New Window",
      click: () => {
        createLoadingWindow();
        createWindow();
      },
    },
    { type: "separator" },
    {
      label: "Recent Documents",
      role: "recentDocuments",
      submenu: [{ role: "clearRecentDocuments" }],
    },
  ]);

  app.dock.setMenu(dockMenu);
}

// Windows Jump List
function setupJumpList() {
  if (process.platform !== "win32") return;

  app.setJumpList([
    {
      name: "Recent",
      type: "recent",
    },
    {
      name: "Tasks",
      type: "tasks",
      items: [
        {
          type: "task",
          title: "New Window",
          description: "Open a new LearnNova window",
          program: process.execPath,
          args: "--new-window",
          iconPath: process.execPath,
          iconIndex: 0,
        },
      ],
    },
  ]);
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  try { require("./database").closeDb(); } catch {}
});
