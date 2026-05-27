#!/usr/bin/env node
/**
 * Installs Clay UI peer + Tailwind dependencies in the consuming project.
 * Run automatically on postinstall (via INIT_CWD) or manually: npx clay-ui-setup
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const PEERS = ['react', 'react-dom', 'lucide-react', 'recharts']
const DEV_DEPS = ['tailwindcss@^3.4.10', 'postcss', 'autoprefixer']

const TAILWIND_ESM = `import clayPreset from 'clay-ui/preset'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [clayPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/clay-ui/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Varela Round', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
}
`

const TAILWIND_CJS = `/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('clay-ui/preset')],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/clay-ui/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Varela Round', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
}
`

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function detectPackageManager(root) {
  if (existsSync(join(root, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(root, 'yarn.lock'))) return 'yarn'
  if (existsSync(join(root, 'bun.lock')) || existsSync(join(root, 'bun.lockb'))) return 'bun'
  return 'npm'
}

function packageName(spec) {
  if (spec.startsWith('@')) {
    const idx = spec.indexOf('@', 1)
    return idx === -1 ? spec : spec.slice(0, idx)
  }
  const idx = spec.indexOf('@')
  return idx === -1 ? spec : spec.slice(0, idx)
}

function isInstalled(root, spec) {
  const name = packageName(spec)
  return existsSync(join(root, 'node_modules', name, 'package.json'))
}

function addPackages(pm, root, packages, dev = false) {
  const missing = packages.filter((p) => !isInstalled(root, p))
  if (missing.length === 0) return []

  const list = missing.join(' ')
  let cmd
  switch (pm) {
    case 'pnpm':
      cmd = dev ? `pnpm add -D ${list}` : `pnpm add ${list}`
      break
    case 'yarn':
      cmd = dev ? `yarn add -D ${list}` : `yarn add ${list}`
      break
    case 'bun':
      cmd = dev ? `bun add -d ${list}` : `bun add ${list}`
      break
    default:
      cmd = dev
        ? `npm install ${list} --save-dev --no-fund --no-audit`
        : `npm install ${list} --save --no-fund --no-audit`
  }

  console.log(`[clay-ui] ${cmd}`)
  execSync(cmd, { cwd: root, stdio: 'inherit' })
  return missing
}

function hasTailwindConfig(root) {
  return ['tailwind.config.js', 'tailwind.config.cjs', 'tailwind.config.mjs', 'tailwind.config.ts'].some(
    (f) => existsSync(join(root, f)),
  )
}

function scaffoldTailwind(root, pkg) {
  if (hasTailwindConfig(root)) return false
  const path = join(root, 'tailwind.config.js')
  const template = pkg.type === 'module' ? TAILWIND_ESM : TAILWIND_CJS
  writeFileSync(path, template, 'utf8')
  console.log(`[clay-ui] Created ${path}`)
  return true
}

function scaffoldPostcss(root, pkg) {
  const path = join(root, 'postcss.config.js')
  if (existsSync(path)) return false
  const body =
    pkg.type === 'module'
      ? `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
      : `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
  writeFileSync(path, body, 'utf8')
  console.log(`[clay-ui] Created ${path}`)
  return true
}

export function runSetup(options = {}) {
  const root = options.root ?? process.env.INIT_CWD ?? process.cwd()

  if (process.env.CLAY_UI_SKIP_POSTINSTALL === '1') {
    console.log('[clay-ui] Setup skipped (CLAY_UI_SKIP_POSTINSTALL=1).')
    return
  }

  const pkgPath = join(root, 'package.json')
  if (!existsSync(pkgPath)) {
    console.log('[clay-ui] No package.json found — skipping setup.')
    return
  }

  const pkg = readJson(pkgPath)
  if (pkg.name === 'clay-ui') {
    console.log('[clay-ui] Library repo detected — skipping consumer setup.')
    return
  }

  const usesClay =
    pkg.dependencies?.['clay-ui'] ||
    pkg.devDependencies?.['clay-ui'] ||
    options.force

  if (!usesClay) {
    console.log('[clay-ui] clay-ui is not a dependency — skipping setup.')
    return
  }

  console.log('[clay-ui] Setting up dependencies in', root)

  const pm = detectPackageManager(root)
  const installedPeers = addPackages(pm, root, PEERS, false)
  const installedDev = addPackages(pm, root, DEV_DEPS, true)

  const createdTw = scaffoldTailwind(root, pkg)
  scaffoldPostcss(root, pkg)

  if (installedPeers.length || installedDev.length || createdTw) {
    console.log('\n[clay-ui] Setup complete. Next steps:')
    console.log('  1. Import styles in your entry file:')
    console.log("     import 'clay-ui/styles.css'")
    console.log('  2. Add Google fonts (optional):')
    console.log('     Nunito Sans + Varela Round')
    console.log('  3. Use components:')
    console.log("     import { Button } from 'clay-ui'")
    console.log('  Docs: npm run docs:dev inside the clay-ui package → http://localhost:5174\n')
  } else {
    console.log('[clay-ui] All dependencies already present.')
  }
}

