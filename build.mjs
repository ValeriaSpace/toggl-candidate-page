#!/usr/bin/env node
// Build the single-file candidate booklet page.
//
//   node build.mjs
//
// Reads src/index.html, inlines src/styles.css, src/app.js and every
// referenced file in assets/, and writes the self-contained ./index.html
// that gets served. No dependencies; requires Node 16+.

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const read = (p) => readFileSync(resolve(root, p), 'utf8')
const readBytes = (p) => readFileSync(resolve(root, p))

let html = read('src/index.html')

// 1. inline stylesheet and script
html = html.replace(
  '<link rel="stylesheet" href="styles.css">',
  () => `<style>\n${read('src/styles.css').trim()}\n</style>`
)
html = html.replace(
  '<script src="app.js"></script>',
  () => `<script>\n${read('src/app.js').trim()}\n</script>`
)

// 2. inline SVGs marked with data-inline-svg (wordmark, world map)
html = html.replace(
  /<img data-inline-svg src="\.\.\/(assets\/[\w.-]+)"[^>]*>/g,
  (_, path) => read(path).trim()
)

// 3. embed every remaining asset reference as a data URI
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }
html = html.replace(/(\.\.\/)?assets\/([\w.-]+)/g, (match, _up, name) => {
  const path = `assets/${name}`
  const ext = extname(name).toLowerCase()
  if (ext === '.svg') {
    return `data:image/svg+xml,${encodeURIComponent(read(path))}`
  }
  const mime = MIME[ext]
  if (!mime) throw new Error(`Unknown asset type: ${match}`)
  return `data:${mime};base64,${readBytes(path).toString('base64')}`
})

if (/assets\//.test(html)) throw new Error('Unresolved asset references remain')

writeFileSync(resolve(root, 'index.html'), html)
console.log(`Built index.html (${(html.length / 1024).toFixed(0)} KB)`)
