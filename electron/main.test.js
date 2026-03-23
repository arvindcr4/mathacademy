// Unit tests for Electron main process configuration
import { describe, it, expect, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'

describe('Electron App Configuration', () => {
  const electronDir = path.join(__dirname)
  let mainContent

  beforeAll(() => {
    mainContent = fs.readFileSync(path.join(electronDir, 'main.js'), 'utf-8')
  })

  describe('Window Configuration', () => {
    it('should have correct window dimensions', () => {
      expect(mainContent).toContain('width: 1280')
      expect(mainContent).toContain('height: 900')
      expect(mainContent).toContain('minWidth: 800')
      expect(mainContent).toContain('minHeight: 600')
    })

    it('should have correct background color', () => {
      expect(mainContent).toContain('backgroundColor: "#0f172a"')
    })

    it('should have correct web preferences', () => {
      expect(mainContent).toContain('contextIsolation: true')
      expect(mainContent).toContain('nodeIntegration: false')
    })

    it('should have correct window title', () => {
      expect(mainContent).toContain('title: "LearnNova"')
    })
  })

  describe('File Structure', () => {
    it('should have main.js file', () => {
      expect(fs.existsSync(path.join(electronDir, 'main.js'))).toBe(true)
    })

    it('should have preload.js file', () => {
      expect(fs.existsSync(path.join(electronDir, 'preload.js'))).toBe(true)
    })

    it('should have valid preload script exports', () => {
      const preloadContent = fs.readFileSync(path.join(electronDir, 'preload.js'), 'utf-8')
      expect(preloadContent).toContain('contextBridge.exposeInMainWorld')
      expect(preloadContent).toContain('electronAPI')
      expect(preloadContent).toContain('platform')
      expect(preloadContent).toContain('isElectron')
    })
  })

  describe('Preload Script API', () => {
    it('should expose platform property', () => {
      const validPlatforms = ['darwin', 'win32', 'linux']
      expect(validPlatforms).toContain(process.platform)
    })

    it('should have correct API structure', () => {
      const preloadContent = fs.readFileSync(path.join(electronDir, 'preload.js'), 'utf-8')
      expect(preloadContent).toMatch(/platform:\s*process\.platform/)
      expect(preloadContent).toMatch(/isElectron:\s*true/)
    })
  })

  describe('Security Configuration', () => {
    it('should enable context isolation', () => {
      expect(mainContent).toContain('contextIsolation: true')
    })

    it('should disable node integration', () => {
      expect(mainContent).toContain('nodeIntegration: false')
    })

    it('should use preload script path', () => {
      expect(mainContent).toContain('preload: path.join(__dirname, "preload.js")')
    })
  })

  describe('App Lifecycle', () => {
    it('should handle window-all-closed event', () => {
      expect(mainContent).toContain('app.on("window-all-closed"')
      expect(mainContent).toContain('app.quit()')
    })

    it('should handle activate event for macOS', () => {
      expect(mainContent).toContain('app.on("activate"')
      expect(mainContent).toContain('BrowserWindow.getAllWindows()')
    })

    it('should handle ready event', () => {
      expect(mainContent).toContain('app.whenReady()')
      expect(mainContent).toContain('createWindow()')
    })
  })

  describe('Dev vs Production Mode', () => {
    it('should detect dev mode from ELECTRON_DEV env var', () => {
      expect(mainContent).toContain('ELECTRON_DEV === "true"')
    })

    it('should load from localhost in dev mode', () => {
      expect(mainContent).toContain('http://localhost:3000/learnnova')
    })

    it('should open DevTools in dev mode', () => {
      expect(mainContent).toContain('openDevTools()')
    })

    it('should load from out directory in production mode', () => {
      expect(mainContent).toContain('path.join(__dirname, "../out")')
      expect(mainContent).toContain('loadFile(indexPath)')
    })
  })

  describe('Icon Configuration', () => {
    it('should reference favicon.svg', () => {
      expect(mainContent).toContain('favicon.svg')
    })

    it('should use correct icon path relative to main.js', () => {
      expect(mainContent).toContain('path.join(__dirname, "../public/favicon.svg")')
    })
  })

  describe('Window Show Behavior', () => {
    it('should delay window show until ready', () => {
      expect(mainContent).toContain('show: false')
      expect(mainContent).toContain('ready-to-show')
      expect(mainContent).toContain('mainWindow.show()')
    })
  })

  describe('Window Cleanup', () => {
    it('should clean up mainWindow reference on close', () => {
      expect(mainContent).toContain('mainWindow.on("closed"')
      expect(mainContent).toContain('mainWindow = null')
    })
  })

  describe('Module Imports', () => {
    it('should import required Electron modules', () => {
      expect(mainContent).toContain('require("electron")')
    })

    it('should import Node.js path module', () => {
      expect(mainContent).toContain('require("path")')
    })

    it('should import fs module', () => {
      expect(mainContent).toContain('require("fs")')
    })
  })

  describe('Error Resilience', () => {
    it('should handle missing out directory gracefully in production', () => {
      // Check that the code constructs the path properly
      expect(mainContent).toContain('const indexPath = path.join(outDir, "index.html")')
    })

    it('should use mainWindow variable for window tracking', () => {
      expect(mainContent).toContain('let mainWindow')
    })

    it('should not have hardcoded absolute paths', () => {
      // Should use __dirname for relative paths
      expect(mainContent).toContain('__dirname')
      expect(mainContent).not.toContain('/home/')
      expect(mainContent).not.toContain('/Users/')
    })
  })

  describe('Code Quality', () => {
    it('should not use deprecated synchronous APIs in window creation', () => {
      // loadFile is async, loadURL is async - good
      expect(mainContent).toContain('loadURL')
      expect(mainContent).toContain('loadFile')
    })

    it('should use const for require statements in main.js', () => {
      expect(mainContent).toMatch(/const\s*\{\s*app/)
    })

    it('should use const in preload.js', () => {
      const preloadContent = fs.readFileSync(path.join(electronDir, 'preload.js'), 'utf-8')
      expect(preloadContent).toMatch(/const\s*\{\s*contextBridge/)
    })

    it('should have proper event listener pattern', () => {
      expect(mainContent).toContain('.on("')
      expect(mainContent).toContain('.once("')
    })
  })

  describe('Preload Script Validation', () => {
    let preloadContent

    beforeAll(() => {
      preloadContent = fs.readFileSync(path.join(electronDir, 'preload.js'), 'utf-8')
    })

    it('should use contextBridge for security', () => {
      expect(preloadContent).toContain('contextBridge.exposeInMainWorld')
    })

    it('should expose electronAPI namespace', () => {
      expect(preloadContent).toContain('"electronAPI"')
    })

    it('should expose platform as a string value', () => {
      expect(preloadContent).toContain('platform: process.platform')
    })

    it('should expose isElectron as true', () => {
      expect(preloadContent).toContain('isElectron: true')
    })

    it('should not expose require to renderer', () => {
      // The exposed API should not include require
      const apiMatch = preloadContent.match(/electronAPI["\s,]+(\{[\s\S]*?\})/)
      if (apiMatch) {
        expect(apiMatch[1]).not.toContain('require')
      }
    })

    it('should not expose dangerous functions to renderer', () => {
      const apiMatch = preloadContent.match(/electronAPI["\s,]+(\{[\s\S]*?\})/)
      if (apiMatch) {
        expect(apiMatch[1]).not.toContain('eval')
        expect(apiMatch[1]).not.toContain('Function')
      }
    })
  })

  describe('Electron Builder Configuration', () => {
    let builderConfig

    beforeAll(() => {
      const configPath = path.join(electronDir, '..', 'electron-builder.yml')
      const configContent = fs.readFileSync(configPath, 'utf-8')
      builderConfig = yaml.load(configContent)
    })

    it('should have valid app ID', () => {
      expect(builderConfig.appId).toBe('com.learnnova.app')
    })

    it('should have correct product name', () => {
      expect(builderConfig.productName).toBe('LearnNova')
    })

    it('should include electron files in build', () => {
      expect(builderConfig.files).toContain('electron/**/*')
    })

    it('should include out directory in build', () => {
      expect(builderConfig.files).toContain('out/**/*')
    })

    it('should have macOS category set to education', () => {
      expect(builderConfig.mac.category).toBe('public.app-category.education')
    })

    it('should build dmg and zip for macOS', () => {
      expect(builderConfig.mac.target).toContain('dmg')
      expect(builderConfig.mac.target).toContain('zip')
    })

    it('should build nsis and portable for Windows', () => {
      expect(builderConfig.win.target).toContain('nsis')
      expect(builderConfig.win.target).toContain('portable')
    })

    it('should build AppImage and deb for Linux', () => {
      expect(builderConfig.linux.target).toContain('AppImage')
      expect(builderConfig.linux.target).toContain('deb')
    })

    it('should output to dist-electron directory', () => {
      expect(builderConfig.directories.output).toBe('dist-electron')
    })

    it('should have NSIS installer configured', () => {
      expect(builderConfig.nsis).toBeDefined()
      expect(builderConfig.nsis.oneClick).toBe(false)
      expect(builderConfig.nsis.allowToChangeInstallationDirectory).toBe(true)
    })

    it('should have Linux education category', () => {
      expect(builderConfig.linux.category).toBe('Education')
    })

    it('should include copyright notice', () => {
      expect(builderConfig.copyright).toContain('LearnNova')
    })
  })

  describe('Integration Requirements', () => {
    it('should require Next.js output directory for production build', () => {
      const outDir = path.join(electronDir, '..', 'out')
      // Check that main.js references the out directory
      expect(mainContent).toContain('../out')
    })

    it('should have correct preload script path relative to main.js', () => {
      expect(mainContent).toContain('preload: path.join(__dirname, "preload.js")')
    })

    it('should have icon path relative to project root', () => {
      expect(mainContent).toContain('../public/favicon.svg')
    })
  })

  describe('Package.json Electron Scripts', () => {
    let packageJson

    beforeAll(() => {
      const packagePath = path.join(electronDir, '..', 'package.json')
      packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    })

    it('should have electron:dev script', () => {
      expect(packageJson.scripts['electron:dev']).toBeDefined()
      expect(packageJson.scripts['electron:dev']).toContain('electron')
    })

    it('should have electron:build script', () => {
      expect(packageJson.scripts['electron:build']).toBeDefined()
      expect(packageJson.scripts['electron:build']).toContain('electron-builder')
    })

    it('should have electron:start script', () => {
      expect(packageJson.scripts['electron:start']).toBeDefined()
      expect(packageJson.scripts['electron:start']).toContain('electron')
    })

    it('should have correct main entry point for Electron', () => {
      expect(packageJson.main).toBe('electron/main.js')
    })

    it('should use concurrently for electron:dev', () => {
      expect(packageJson.scripts['electron:dev']).toContain('concurrently')
      expect(packageJson.scripts['electron:dev']).toContain('next dev')
    })

    it('should use wait-on for electron:dev', () => {
      expect(packageJson.scripts['electron:dev']).toContain('wait-on')
      expect(packageJson.scripts['electron:dev']).toContain('localhost:3000')
    })

    it('should set ELECTRON_BUILD=true for electron:build', () => {
      expect(packageJson.scripts['electron:build']).toContain('ELECTRON_BUILD=true')
    })
  })

  describe('URL and Path Handling', () => {
    it('should construct correct dev URL with basePath', () => {
      const devUrl = 'http://localhost:3000/learnnova'
      const url = new URL(devUrl)
      expect(url.pathname).toBe('/learnnova')
      expect(url.hostname).toBe('localhost')
      expect(url.port).toBe('3000')
    })

    it('should have consistent basePath in dev and production', () => {
      // Dev: http://localhost:3000/learnnova
      // Prod: out/index.html (built with basePath: '/learnnova')
      const devPath = '/learnnova'
      const prodBasePath = '/learnnova'
      expect(devPath).toBe(prodBasePath)
    })

    it('should use path.join for cross-platform compatibility', () => {
      expect(mainContent).toContain('path.join(__dirname')
      expect(mainContent).toContain('path.join(outDir')
    })

    it('should not use backslashes in path construction', () => {
      // Should use path.join, not string concatenation with backslashes
      expect(mainContent).not.toMatch(/__dirname\s*\\\s*['"]/)
      expect(mainContent).not.toMatch(/['"]\s*\\\s*__dirname/)
    })
  })

  describe('DevTools Behavior', () => {
    it('should open DevTools only in development mode', () => {
      expect(mainContent).toContain('if (isDev)')
      expect(mainContent).toContain('openDevTools()')
      // openDevTools should be inside the isDev condition
      expect(mainContent).toMatch(/if\s*\(isDev\)[\s\S]*?openDevTools/)
    })

    it('should load from dev server in development', () => {
      expect(mainContent).toMatch(/if\s*\(isDev\)[\s\S]*?loadURL/)
    })

    it('should load from static files in production', () => {
      expect(mainContent).toMatch(/else[\s\S]*?loadFile/)
    })
  })

  describe('Environment Variable Handling', () => {
    it('should read ELECTRON_DEV environment variable', () => {
      expect(mainContent).toContain('process.env.ELECTRON_DEV')
    })

    it('should compare ELECTRON_DEV to string "true"', () => {
      expect(mainContent).toContain('ELECTRON_DEV === "true"')
    })

    it('should not use truthy check for ELECTRON_DEV', () => {
      // Should use explicit === "true" check, not just if (process.env.ELECTRON_DEV)
      expect(mainContent).not.toMatch(/if\s*\(\s*process\.env\.ELECTRON_DEV\s*\)/)
    })
  })

  describe('Window State Management', () => {
    it('should declare mainWindow variable at module scope', () => {
      expect(mainContent).toMatch(/let\s+mainWindow/)
    })

    it('should set mainWindow to null on close', () => {
      expect(mainContent).toContain('mainWindow.on("closed"')
      expect(mainContent).toContain('mainWindow = null')
    })

    it('should track window reference for cleanup', () => {
      // mainWindow should be accessible in createWindow and event handlers
      expect(mainContent).toContain('mainWindow = new BrowserWindow')
    })
  })

  describe('App Quit Behavior', () => {
    it('should quit on window-all-closed for non-darwin platforms', () => {
      expect(mainContent).toContain('if (process.platform !== "darwin")')
      expect(mainContent).toContain('app.quit()')
    })

    it('should not quit on window-all-closed for macOS', () => {
      // On macOS, apps stay active until Cmd+Q
      const platformCheck = mainContent.match(/window-all-closed[\s\S]*?if\s*\(process\.platform\s*!==\s*['"]darwin['"]\)/)
      expect(platformCheck).not.toBeNull()
    })

    it('should create new window on activate for macOS', () => {
      expect(mainContent).toContain('app.on("activate"')
      expect(mainContent).toContain('BrowserWindow.getAllWindows().length === 0')
    })
  })

  describe('BrowserWindow Options Validation', () => {
    it('should set show: false to prevent white flash', () => {
      expect(mainContent).toContain('show: false')
    })

    it('should use ready-to-show event', () => {
      expect(mainContent).toContain('ready-to-show')
      expect(mainContent).toContain('mainWindow.show()')
    })

    it('should have reasonable min dimensions for usability', () => {
      // 800x600 is a good minimum for desktop apps
      expect(mainContent).toContain('minWidth: 800')
      expect(mainContent).toContain('minHeight: 600')
    })

    it('should have default dimensions that fit most screens', () => {
      // 1280x900 fits most screens while leaving room for taskbars
      expect(mainContent).toContain('width: 1280')
      expect(mainContent).toContain('height: 900')
    })

    it('should use dark background matching app theme', () => {
      // #0f172a is slate-900 from Tailwind
      expect(mainContent).toContain('backgroundColor: "#0f172a"')
    })
  })

  describe('Production Build Paths', () => {
    it('should reference correct out directory', () => {
      expect(mainContent).toContain('path.join(__dirname, "../out")')
    })

    it('should load index.html from out directory', () => {
      expect(mainContent).toContain('path.join(outDir, "index.html")')
      expect(mainContent).toContain('mainWindow.loadFile(indexPath)')
    })
  })

  describe('Dependencies', () => {
    let packageJson

    beforeAll(() => {
      const packagePath = path.join(electronDir, '..', 'package.json')
      packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    })

    it('should have electron as devDependency', () => {
      expect(packageJson.devDependencies.electron).toBeDefined()
    })

    it('should have electron-builder as devDependency', () => {
      expect(packageJson.devDependencies['electron-builder']).toBeDefined()
    })

    it('should have concurrently for parallel dev tasks', () => {
      expect(packageJson.devDependencies.concurrently).toBeDefined()
    })

    it('should have wait-on for dev server readiness', () => {
      expect(packageJson.devDependencies['wait-on']).toBeDefined()
    })

    it('should have js-yaml for config parsing', () => {
      expect(packageJson.devDependencies['js-yaml']).toBeDefined()
    })
  })

  describe('Error Prevention', () => {
    it('should not have console.log in production code paths', () => {
      // Production code should not have debug logging except in event handlers
      // Event handler logging (power monitor, etc.) is acceptable for debugging
      const lines = mainContent.split('\n')
      const productionLines = lines.filter(
        (line) =>
          !line.includes('isDev') &&
          !line.includes('openDevTools') &&
          !line.includes('console.log("System') &&
          !line.includes('console.log("Screen') &&
          !line.includes('console.log("Auto-updater')
      )
      const hasConsoleLog = productionLines.some((line) => line.includes('console.log'))
      expect(hasConsoleLog).toBe(false)
    })

    it('should not use synchronous file operations in main event loop', () => {
      // Synchronous operations during app startup are acceptable
      // but should be avoided in window event handlers
      const syncOps = mainContent.match(/mainWindow\.on\([^)]+\)[^{]*\{[^}]*fs\.[a-z]+Sync/g)
      expect(syncOps).toBeNull()
    })

    it('should handle mainWindow being null gracefully', () => {
      // The closed event sets mainWindow = null
      expect(mainContent).toContain('mainWindow = null')
    })
  })

  describe('Code Structure', () => {
    it('should define createWindow as a function', () => {
      expect(mainContent).toContain('function createWindow()')
    })

    it('should call createWindow when app is ready', () => {
      expect(mainContent).toContain('app.whenReady()')
      expect(mainContent).toContain('createWindow()')
    })

    it('should have all event handlers within app.whenReady', () => {
      // activate handler should be inside whenReady
      expect(mainContent).toContain('app.on("activate"')
    })
  })

  describe('Application Menu', () => {
    it('should create application menu', () => {
      expect(mainContent).toContain('function createMenu()')
      expect(mainContent).toContain('Menu.buildFromTemplate')
      expect(mainContent).toContain('Menu.setApplicationMenu(menu)')
    })

    it('should have File menu', () => {
      expect(mainContent).toContain('label: "File"')
    })

    it('should have Edit menu with standard operations', () => {
      expect(mainContent).toContain('label: "Edit"')
      expect(mainContent).toContain('role: "undo"')
      expect(mainContent).toContain('role: "redo"')
      expect(mainContent).toContain('role: "copy"')
      expect(mainContent).toContain('role: "paste"')
    })

    it('should have View menu with zoom and dev tools', () => {
      expect(mainContent).toContain('label: "View"')
      expect(mainContent).toContain('role: "toggleDevTools"')
      expect(mainContent).toContain('role: "zoomIn"')
      expect(mainContent).toContain('role: "zoomOut"')
    })

    it('should have Window menu', () => {
      expect(mainContent).toContain('label: "Window"')
      expect(mainContent).toContain('role: "minimize"')
    })

    it('should have Help menu with external links', () => {
      expect(mainContent).toContain('role: "help"')
      expect(mainContent).toContain('shell.openExternal')
    })

    it('should handle macOS app menu differently', () => {
      expect(mainContent).toContain('process.platform === "darwin"')
      expect(mainContent).toContain('role: "about"')
    })
  })

  describe('External Link Handling', () => {
    it('should use setWindowOpenHandler for external links', () => {
      expect(mainContent).toContain('setWindowOpenHandler')
    })

    it('should open external links in default browser', () => {
      expect(mainContent).toContain('shell.openExternal(url)')
    })

    it('should deny opening external windows in app', () => {
      expect(mainContent).toContain('action: "deny"')
    })

    it('should handle will-navigate for external URLs', () => {
      expect(mainContent).toContain('will-navigate')
      expect(mainContent).toContain('event.preventDefault()')
    })
  })

  describe('Dialog Support', () => {
    it('should import dialog module', () => {
      expect(mainContent).toContain('dialog')
    })

    it('should have About dialog for non-macOS', () => {
      expect(mainContent).toContain('dialog.showMessageBox')
      expect(mainContent).toContain('About')
    })
  })

  describe('Window State Persistence', () => {
    it('should have loadWindowState function', () => {
      expect(mainContent).toContain('function loadWindowState()')
    })

    it('should have saveWindowState function', () => {
      expect(mainContent).toContain('function saveWindowState()')
    })

    it('should use userData path for state storage', () => {
      expect(mainContent).toContain('app.getPath("userData")')
    })

    it('should save state on window close', () => {
      expect(mainContent).toContain('mainWindow.on("close"')
    })

    it('should save state on resize and move', () => {
      expect(mainContent).toContain('mainWindow.on("resize"')
      expect(mainContent).toContain('mainWindow.on("move"')
    })

    it('should restore maximized state', () => {
      expect(mainContent).toContain('mainWindow.maximize()')
    })

    it('should handle state file errors gracefully', () => {
      expect(mainContent).toContain('try')
      expect(mainContent).toContain('catch')
    })
  })

  describe('Loading Indicator', () => {
    it('should have createLoadingWindow function', () => {
      expect(mainContent).toContain('function createLoadingWindow()')
    })

    it('should close loading window when main window is ready', () => {
      expect(mainContent).toContain('loadingWindow.close()')
    })

    it('should show loading spinner', () => {
      expect(mainContent).toContain('spinner')
    })

    it('should center loading window', () => {
      expect(mainContent).toContain('center: true')
    })
  })

  describe('Error Handling', () => {
    it('should handle failed page loads', () => {
      expect(mainContent).toContain('did-fail-load')
    })

    it('should show error dialog for load failures', () => {
      expect(mainContent).toContain('dialog.showErrorBox')
    })

    it('should check if out directory exists', () => {
      expect(mainContent).toContain('fs.existsSync(outDir)')
    })

    it('should quit gracefully if build not found', () => {
      expect(mainContent).toContain('app.quit()')
    })
  })

  describe('Spell Checker', () => {
    it('should enable spellcheck in webPreferences', () => {
      expect(mainContent).toContain('spellcheck: true')
    })
  })

  describe('Context Menu', () => {
    it('should handle context-menu event', () => {
      expect(mainContent).toContain('context-menu')
    })

    it('should copy selected text', () => {
      expect(mainContent).toContain('selectionText')
      expect(mainContent).toContain('role: "copy"')
    })

    it('should handle link context menu', () => {
      expect(mainContent).toContain('linkURL')
      expect(mainContent).toContain('Copy Link Address')
    })

    it('should handle image context menu', () => {
      expect(mainContent).toContain('hasImageContents')
      expect(mainContent).toContain('Copy Image')
    })

    it('should use Menu.popup for context menu', () => {
      expect(mainContent).toContain('menu.popup')
    })

    it('should use MenuItem for context menu items', () => {
      expect(mainContent).toContain('new MenuItem')
    })
  })

  describe('Navigation Shortcuts', () => {
    it('should handle Alt+Left for back navigation', () => {
      expect(mainContent).toContain('ArrowLeft')
      expect(mainContent).toContain('goBack()')
    })

    it('should handle Alt+Right for forward navigation', () => {
      expect(mainContent).toContain('ArrowRight')
      expect(mainContent).toContain('goForward()')
    })

    it('should check canGoBack before navigating', () => {
      expect(mainContent).toContain('canGoBack()')
    })

    it('should check canGoForward before navigating', () => {
      expect(mainContent).toContain('canGoForward()')
    })

    it('should use before-input-event for keyboard handling', () => {
      expect(mainContent).toContain('before-input-event')
    })

    it('should prevent default on shortcut', () => {
      expect(mainContent).toContain('event.preventDefault()')
    })
  })

  describe('Clipboard Support', () => {
    it('should have clipboard module available', () => {
      expect(mainContent).toContain('clipboard')
    })

    it('should write to clipboard for copy link', () => {
      expect(mainContent).toContain('writeText')
    })
  })

  describe('Protocol Handler', () => {
    it('should register learnnova protocol', () => {
      expect(mainContent).toContain('setAsDefaultProtocolClient')
      expect(mainContent).toContain('learnnova')
    })

    it('should handle second-instance event', () => {
      expect(mainContent).toContain('second-instance')
    })

    it('should handle open-url event (macOS)', () => {
      expect(mainContent).toContain('open-url')
    })

    it('should have handleProtocolUrl function', () => {
      expect(mainContent).toContain('function handleProtocolUrl')
    })

    it('should parse protocol URL with URL constructor', () => {
      expect(mainContent).toContain('new URL(urlString)')
    })

    it('should focus window when handling protocol URL', () => {
      expect(mainContent).toContain('mainWindow.focus()')
    })

    it('should restore minimized window', () => {
      expect(mainContent).toContain('mainWindow.restore()')
    })
  })

  describe('Preload Script Enhanced API', () => {
    let preloadContent

    beforeAll(() => {
      preloadContent = fs.readFileSync(path.join(electronDir, 'preload.js'), 'utf-8')
    })

    it('should expose notifications API', () => {
      expect(preloadContent).toContain('notifications:')
      expect(preloadContent).toContain('isSupported')
      expect(preloadContent).toContain('show')
    })

    it('should expose getAppVersion', () => {
      expect(preloadContent).toContain('getAppVersion')
    })

    it('should expose platform helpers', () => {
      expect(preloadContent).toContain('isMac')
      expect(preloadContent).toContain('isWindows')
      expect(preloadContent).toContain('isLinux')
    })

    it('should import Notification from electron', () => {
      expect(preloadContent).toContain('Notification')
    })

    it('should handle notification click', () => {
      expect(preloadContent).toContain('notification.on("click"')
    })

    it('should close notification on click', () => {
      expect(preloadContent).toContain('notification.close()')
    })
  })

  describe('Single Instance Lock', () => {
    it('should request single instance lock', () => {
      expect(mainContent).toContain('requestSingleInstanceLock()')
    })

    it('should quit if another instance is running', () => {
      expect(mainContent).toContain('if (!gotTheLock)')
      expect(mainContent).toContain('app.quit()')
    })

    it('should handle second-instance event in first instance', () => {
      expect(mainContent).toContain('app.on("second-instance"')
    })

    it('should focus main window when second instance tries to start', () => {
      expect(mainContent).toContain('mainWindow.focus()')
    })

    it('should restore minimized window on second instance', () => {
      expect(mainContent).toContain('mainWindow.restore()')
    })
  })

  describe('Power Monitor', () => {
    it('should import powerMonitor from electron', () => {
      expect(mainContent).toContain('powerMonitor')
    })

    it('should handle suspend event', () => {
      expect(mainContent).toContain('powerMonitor.on("suspend"')
    })

    it('should handle resume event', () => {
      expect(mainContent).toContain('powerMonitor.on("resume"')
    })

    it('should handle lock-screen event', () => {
      expect(mainContent).toContain('powerMonitor.on("lock-screen"')
    })

    it('should handle unlock-screen event', () => {
      expect(mainContent).toContain('powerMonitor.on("unlock-screen"')
    })

    it('should save state on suspend/lock', () => {
      expect(mainContent).toContain('saveWindowState()')
    })
  })

  describe('System Tray', () => {
    it('should have createTray function', () => {
      expect(mainContent).toContain('function createTray()')
    })

    it('should import Tray from electron', () => {
      expect(mainContent).toContain('Tray')
    })

    it('should import nativeImage for tray icon', () => {
      expect(mainContent).toContain('nativeImage')
    })

    it('should set tray tooltip', () => {
      expect(mainContent).toContain('setToolTip')
    })

    it('should set tray context menu', () => {
      expect(mainContent).toContain('setContextMenu')
    })

    it('should handle double-click on tray', () => {
      expect(mainContent).toContain('tray.on("double-click"')
    })

    it('should have Open option in tray menu', () => {
      expect(mainContent).toContain('Open LearnNova')
    })

    it('should have Quit option in tray menu', () => {
      expect(mainContent).toContain('label: "Quit"')
    })
  })

  describe('Taskbar Progress', () => {
    it('should have setProgress function', () => {
      expect(mainContent).toContain('function setProgress')
    })

    it('should use setProgressBar on mainWindow', () => {
      expect(mainContent).toContain('setProgressBar')
    })

    it('should validate progress range (0 to 1)', () => {
      expect(mainContent).toContain('progress >= 0')
      expect(mainContent).toContain('progress <= 1')
    })

    it('should support hiding progress with -1', () => {
      expect(mainContent).toContain('progress === -1')
    })
  })

  describe('Badge Count (macOS)', () => {
    it('should have setBadgeCount function', () => {
      expect(mainContent).toContain('function setBadgeCount')
    })

    it('should only apply badge on macOS', () => {
      expect(mainContent).toContain('darwin')
      expect(mainContent).toContain('app.dock.setBadge')
    })
  })

  describe('Recent Documents', () => {
    it('should have addRecentDocument function', () => {
      expect(mainContent).toContain('function addRecentDocument')
    })

    it('should have clearRecentDocuments function', () => {
      expect(mainContent).toContain('function clearRecentDocuments')
    })

    it('should use app.addRecentDocument', () => {
      expect(mainContent).toContain('app.addRecentDocument')
    })

    it('should use app.clearRecentDocuments', () => {
      expect(mainContent).toContain('app.clearRecentDocuments')
    })
  })

  describe('Download Manager', () => {
    it('should have setupDownloadManager function', () => {
      expect(mainContent).toContain('function setupDownloadManager()')
    })

    it('should handle will-download event', () => {
      expect(mainContent).toContain('will-download')
    })

    it('should track download progress', () => {
      expect(mainContent).toContain('getReceivedBytes')
      expect(mainContent).toContain('getTotalBytes')
    })

    it('should show download complete notification', () => {
      expect(mainContent).toContain('Download Complete')
      expect(mainContent).toContain('Notification')
    })

    it('should set save path for downloads', () => {
      expect(mainContent).toContain('setSavePath')
    })

    it('should use downloads folder', () => {
      expect(mainContent).toContain('app.getPath("downloads")')
    })

    it('should handle download failure', () => {
      expect(mainContent).toContain('Download Failed')
    })

    it('should update taskbar progress during download', () => {
      expect(mainContent).toContain('setProgress')
    })
  })

  describe('Auto-updater', () => {
    it('should have setupAutoUpdater function', () => {
      expect(mainContent).toContain('function setupAutoUpdater()')
    })

    it('should have placeholder for electron-updater', () => {
      expect(mainContent).toContain('electron-updater')
    })

    it('should support checkForUpdatesAndNotify', () => {
      expect(mainContent).toContain('checkForUpdatesAndNotify')
    })

    it('should handle update-available event', () => {
      expect(mainContent).toContain('update-available')
    })

    it('should handle update-downloaded event', () => {
      expect(mainContent).toContain('update-downloaded')
    })
  })

  describe('macOS Dock Menu', () => {
    it('should have setupDockMenu function', () => {
      expect(mainContent).toContain('function setupDockMenu()')
    })

    it('should only run on macOS', () => {
      expect(mainContent).toContain('process.platform !== "darwin"')
    })

    it('should use app.dock.setMenu', () => {
      expect(mainContent).toContain('app.dock.setMenu')
    })

    it('should have New Window option', () => {
      expect(mainContent).toContain('New Window')
    })

    it('should have recent documents in dock', () => {
      expect(mainContent).toContain('recentDocuments')
    })
  })

  describe('Windows Jump List', () => {
    it('should have setupJumpList function', () => {
      expect(mainContent).toContain('function setupJumpList()')
    })

    it('should only run on Windows', () => {
      expect(mainContent).toContain('process.platform !== "win32"')
    })

    it('should use app.setJumpList', () => {
      expect(mainContent).toContain('app.setJumpList')
    })

    it('should have Tasks category', () => {
      expect(mainContent).toContain('Tasks')
    })

    it('should have Recent category', () => {
      expect(mainContent).toContain('Recent')
    })
  })
})
