const { app, BrowserWindow, Menu, shell, dialog, MenuItem, powerMonitor, Tray, nativeImage } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

let mainWindow;
let loadingWindow;
let tray = null;

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
      const protocolUrl = commandLine.find((arg) => arg.startsWith("mathacademy://"));
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
          <div>Loading MathAcademy...</div>
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
            await shell.openExternal("https://mathacademy.com");
          },
        },
        {
          label: "Report Issue",
          click: async () => {
            await shell.openExternal(
              "https://github.com/mathacademy/mathacademy/issues"
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
  const iconPath = path.join(__dirname, "../public/favicon.svg");

  // Create tray icon
  const trayIcon = nativeImage.createFromPath(iconPath);

  if (trayIcon.isEmpty()) {
    // Fallback to a simple 16x16 icon if SVG fails
    const fallbackIcon = nativeImage.createEmpty();
    tray = new Tray(fallbackIcon);
  } else {
    tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));
  }

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open MathAcademy",
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

  tray.setToolTip("MathAcademy");
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

  mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    minWidth: 800,
    minHeight: 600,
    title: "MathAcademy",
    icon: path.join(__dirname, "../public/favicon.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
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
    // Open external links in default browser
    if (url.startsWith("http://") || url.startsWith("https://")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  // Handle navigation to external URLs
  mainWindow.webContents.on("will-navigate", (event, url) => {
    const isInternal =
      url.startsWith("http://localhost:") ||
      url.startsWith("file://") ||
      url.includes("mathacademy");

    if (!isInternal && (url.startsWith("http://") || url.startsWith("https://"))) {
      event.preventDefault();
      shell.openExternal(url);
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
          click: () => shell.openExternal(params.linkURL),
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
            click: () => shell.openExternal(params.srcURL),
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

    menu.popup(mainWindow, params.x, params.y);
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

  if (isDev) {
    // Development: load from Next.js dev server
    mainWindow.loadURL("http://localhost:3000/mathacademy");
    mainWindow.webContents.openDevTools();
  } else {
    // Production: load from static export
    const outDir = path.join(__dirname, "../out");

    // Check if out directory exists
    if (!fs.existsSync(outDir)) {
      dialog.showErrorBox(
        "Build Error",
        "Application not built. Please run 'pnpm build' first."
      );
      app.quit();
      return;
    }

    const indexPath = path.join(outDir, "index.html");
    mainWindow.loadFile(indexPath);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Register protocol handler for deep links
  const protocolSuccess = app.setAsDefaultProtocolClient("mathacademy");
  if (!protocolSuccess) {
    console.error("Failed to register protocol handler");
  }

  createMenu();
  createLoadingWindow();
  createWindow();

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

// Handle protocol links (Windows/Linux)
app.on("second-instance", (event, commandLine, workingDirectory) => {
  // Someone tried to run a second instance, focus our window instead
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();

    // Handle the protocol URL if provided
    const protocolUrl = commandLine.find((arg) => arg.startsWith("mathacademy://"));
    if (protocolUrl) {
      handleProtocolUrl(protocolUrl);
    }
  }
});

// Handle protocol links (macOS)
app.on("open-url", (event, url) => {
  event.preventDefault();
  handleProtocolUrl(url);
});

// Parse and handle protocol URLs
function handleProtocolUrl(urlString) {
  try {
    const url = new URL(urlString);
    if (url.protocol === "mathacademy:") {
      const path = url.pathname;
      const search = url.search;

      // Navigate to the path in the app
      if (mainWindow) {
        const isDev = process.env.ELECTRON_DEV === "true";
        const baseUrl = isDev
          ? "http://localhost:3000/mathacademy"
          : `file://${path.join(__dirname, "../out/index.html")}`;

        const fullUrl = `${baseUrl}${path}${search}`;
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

  const { JumpListCategory } = require("electron");
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
          description: "Open a new MathAcademy window",
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
