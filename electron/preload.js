const { contextBridge, ipcRenderer, Notification } = require("electron");

// Expose any APIs to the renderer process here
contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,
  isElectron: true,

  // Notification API
  notifications: {
    isSupported: () => Notification.isSupported(),
    show: (title, options = {}) => {
      if (!Notification.isSupported()) {
        return false;
      }

      const notification = new Notification({
        title,
        body: options.body || "",
        icon: options.icon,
        silent: options.silent || false,
      });

      notification.on("click", () => {
        notification.close();
        if (options.onClick) {
          options.onClick();
        }
      });

      notification.show();
      return true;
    },
  },

  // App info
  getAppVersion: () => process.env.npm_package_version || "1.0.0",

  // Platform helpers
  isMac: process.platform === "darwin",
  isWindows: process.platform === "win32",
  isLinux: process.platform === "linux",
});
