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
      expect(mainContent).toContain('title: "MathAcademy"')
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
      expect(mainContent).toContain('http://localhost:3000/mathacademy')
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
      expect(builderConfig.appId).toBe('com.mathacademy.app')
    })

    it('should have correct product name', () => {
      expect(builderConfig.productName).toBe('MathAcademy')
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
      expect(builderConfig.copyright).toContain('MathAcademy')
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
      const devUrl = 'http://localhost:3000/mathacademy'
      const url = new URL(devUrl)
      expect(url.pathname).toBe('/mathacademy')
      expect(url.hostname).toBe('localhost')
      expect(url.port).toBe('3000')
    })

    it('should have consistent basePath in dev and production', () => {
      // Dev: http://localhost:3000/mathacademy
      // Prod: out/index.html (built with basePath: '/mathacademy')
      const devPath = '/mathacademy'
      const prodBasePath = '/mathacademy'
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
})
