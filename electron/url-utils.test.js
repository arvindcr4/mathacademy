import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import path from 'path'
import os from 'os'
import { createRequire } from 'module'
import fs from 'fs'

const require = createRequire(import.meta.url)
const {
  buildAppLoadUrl,
  isAppNavigationUrl,
  isSafeExternalUrl,
  normalizeDeepLinkRoute,
  resolveAppNavigationTarget,
  resolveFileAssetRequestTarget,
  resolveFileNavigationRoute,
} = require('./url-utils')

describe('electron url utils', () => {
  let fixtureRoot
  let outDir
  let publicDir

  beforeEach(() => {
    fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'learnnova-url-utils-'))
    outDir = path.join(fixtureRoot, 'out')
    publicDir = path.join(fixtureRoot, 'public')

    fs.mkdirSync(path.join(outDir, '_next/static/chunks'), { recursive: true })
    fs.mkdirSync(publicDir, { recursive: true })

    fs.writeFileSync(path.join(outDir, 'index.html'), '<html></html>')
    fs.writeFileSync(path.join(outDir, 'dashboard.html'), '<html></html>')
    fs.writeFileSync(path.join(outDir, '404.html'), '<html></html>')
    fs.writeFileSync(path.join(outDir, '_next/static/chunks', 'main.js'), 'console.log("chunk")')
    fs.writeFileSync(path.join(publicDir, 'favicon.svg'), '<svg></svg>')
  })

  afterEach(() => {
    fs.rmSync(fixtureRoot, { recursive: true, force: true })
  })

  describe('normalizeDeepLinkRoute', () => {
    it('maps host-only deep links to a renderer route', () => {
      expect(normalizeDeepLinkRoute(new URL('learnnova://dashboard'))).toBe('/dashboard')
    })

    it('maps nested deep links to the exported route path', () => {
      expect(
        normalizeDeepLinkRoute(new URL('learnnova://course/karpathy-nn-zero-to-hero'))
      ).toBe('/course/karpathy-nn-zero-to-hero')
    })
  })

  describe('buildAppLoadUrl', () => {
    it('builds dev URLs inside the Electron base path', () => {
      expect(
        buildAppLoadUrl({
          routePath: '/dashboard',
          search: '?tab=progress',
          isDev: true,
          outDir,
        })
      ).toBe('http://localhost:3000/learnnova/dashboard?tab=progress')
    })

    it('builds dev URLs correctly when the app runs at the root path', () => {
      expect(
        buildAppLoadUrl({
          routePath: '/dashboard',
          isDev: true,
          outDir,
          devBaseUrl: 'http://localhost:3000',
        })
      ).toBe('http://localhost:3000/dashboard')
    })

    it('resolves exported HTML files for packaged builds', () => {
      const loadUrl = buildAppLoadUrl({
        routePath: '/dashboard',
        isDev: false,
        outDir,
      })

      expect(loadUrl.endsWith('/out/dashboard.html')).toBe(true)
    })

    it('falls back to the static 404 page for unknown packaged routes', () => {
      const loadUrl = buildAppLoadUrl({
        routePath: '/missing-route',
        isDev: false,
        outDir,
      })

      expect(loadUrl.endsWith('/out/404.html')).toBe(true)
    })
  })

  describe('isAppNavigationUrl', () => {
    it('allows the dev server base path', () => {
      expect(
        isAppNavigationUrl('http://localhost:3000/learnnova/dashboard', { outDir })
      ).toBe(true)
    })

    it('allows internal dev URLs when the app is served from the root path', () => {
      expect(
        isAppNavigationUrl('http://localhost:3000/dashboard', {
          outDir,
          devBaseUrl: 'http://localhost:3000',
        })
      ).toBe(true)
    })

    it('allows packaged file navigation inside the exported out directory', () => {
      expect(
        isAppNavigationUrl(`file://${path.join(outDir, 'dashboard.html')}`, { outDir })
      ).toBe(true)
    })

    it('blocks lookalike external URLs that only mention the app name', () => {
      expect(
        isAppNavigationUrl('https://evil.example/learnnova/dashboard', { outDir })
      ).toBe(false)
    })
  })

  describe('isSafeExternalUrl', () => {
    it('allows standard web protocols', () => {
      expect(isSafeExternalUrl('https://learnnova.com')).toBe(true)
    })

    it('blocks script and file URLs from being forwarded to the OS', () => {
      expect(isSafeExternalUrl('javascript:alert(1)')).toBe(false)
      expect(isSafeExternalUrl('file:///etc/passwd')).toBe(false)
    })
  })

  describe('resolveFileNavigationRoute', () => {
    it('maps root-style file URLs into app routes', () => {
      expect(resolveFileNavigationRoute('file:///dashboard', { outDir })).toBe('/dashboard')
      expect(resolveFileNavigationRoute('file:///course/karpathy-nn-zero-to-hero', { outDir })).toBe(
        '/course/karpathy-nn-zero-to-hero'
      )
    })

    it('strips the exported base path from file URLs', () => {
      expect(resolveFileNavigationRoute('file:///learnnova/dashboard', { outDir })).toBe(
        '/dashboard'
      )
      expect(
        resolveFileNavigationRoute('file:///learnnova/course/karpathy-nn-zero-to-hero', {
          outDir,
        })
      ).toBe('/course/karpathy-nn-zero-to-hero')
    })

    it('ignores file URLs that already point inside the exported app bundle', () => {
      expect(
        resolveFileNavigationRoute(`file://${path.join(outDir, 'dashboard.html')}`, { outDir })
      ).toBeNull()
    })
  })

  describe('resolveFileAssetRequestTarget', () => {
    it('maps absolute _next asset requests back into the exported out directory', () => {
      const firstChunkName = fs
        .readdirSync(path.join(outDir, '_next/static/chunks'))
        .find((entry) => entry.endsWith('.js'))

      expect(firstChunkName).toBeTruthy()

      const target = resolveFileAssetRequestTarget(
        `file:///learnnova/_next/static/chunks/${firstChunkName}`,
        {
          outDir,
          publicDir,
        }
      )

      expect(target?.endsWith(`/out/_next/static/chunks/${firstChunkName}`)).toBe(true)
    })

    it('falls back to public assets when the file is not present in out', () => {
      const originalExistsSync = fs.existsSync
      const existsSyncSpy = vi.spyOn(fs, 'existsSync').mockImplementation((candidate) => {
        const normalized = String(candidate).replace(/\\\\/g, '/')
        if (normalized.endsWith('/out/favicon.svg')) return false
        return normalized.endsWith('/public/favicon.svg') || originalExistsSync(candidate)
      })

      const target = resolveFileAssetRequestTarget('file:///learnnova/favicon.svg', {
        outDir,
        publicDir,
      })

      expect(target?.endsWith('/public/favicon.svg')).toBe(true)
      existsSyncSpy.mockRestore()
    })

    it('maps root-path asset requests when the app is served without a base path', () => {
      const target = resolveFileAssetRequestTarget('file:///_next/static/chunks/main.js', {
        outDir,
        publicDir,
        basePath: '/',
      })

      expect(target?.endsWith('/out/_next/static/chunks/main.js')).toBe(true)
    })

    it('ignores unrelated file requests outside the app base path', () => {
      expect(
        resolveFileAssetRequestTarget('file:///Users/arvind/learnnova/out/index.html', {
          outDir,
          publicDir,
        })
      ).toBeNull()
    })
  })

  describe('resolveAppNavigationTarget', () => {
    it('leaves normal internal app URLs unchanged', () => {
      const rawUrl = `file://${path.join(outDir, 'dashboard.html')}`
      expect(resolveAppNavigationTarget(rawUrl, { outDir })).toBe(rawUrl)
    })

    it('rewrites root-style file routes to the exported HTML files', () => {
      const target = resolveAppNavigationTarget('file:///dashboard', { outDir })
      expect(target?.endsWith('/out/dashboard.html')).toBe(true)
    })

    it('rewrites absolute base-path file routes to the exported HTML files', () => {
      const target = resolveAppNavigationTarget('file:///learnnova/dashboard', { outDir })
      expect(target?.endsWith('/out/dashboard.html')).toBe(true)
    })

    it('returns null for true external URLs', () => {
      expect(resolveAppNavigationTarget('https://example.com', { outDir })).toBeNull()
    })
  })
})
