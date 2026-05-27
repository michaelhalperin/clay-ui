import { execSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(import.meta.url), '..', '..')

process.chdir(root)

execSync('npm run build:demo', { stdio: 'inherit' })
execSync('npm run docs:build', { stdio: 'inherit' })

const out = join(root, 'docs/.vitepress/dist')
const showcaseDest = join(out, 'showcase')

if (existsSync(showcaseDest)) rmSync(showcaseDest, { recursive: true })
mkdirSync(showcaseDest, { recursive: true })
cpSync(join(root, 'dist-demo'), showcaseDest, { recursive: true })

console.log('Showcase copied to docs/.vitepress/dist/showcase/')
