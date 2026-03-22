const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: "MathAcademy",
    icon: path.join(__dirname, "../public/favicon.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    backgroundColor: "#0f172a",
    show: false,
  });

  // Show window when ready to avoid white flash
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  const isDev = process.env.ELECTRON_DEV === "true";

  if (isDev) {
    // Development: load from Next.js dev server
    mainWindow.loadURL("http://localhost:3000/mathacademy");
    mainWindow.webContents.openDevTools();
  } else {
    // Production: load from static export
    const outDir = path.join(__dirname, "../out");

    // Register a custom protocol to serve static files
    // This handles the basePath (/mathacademy) correctly
    const indexPath = path.join(outDir, "index.html");
    mainWindow.loadFile(indexPath);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
