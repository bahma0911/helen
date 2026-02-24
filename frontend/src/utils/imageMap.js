// Utility to resolve image paths stored in the DB to Vite-imported URLs.
// It uses Vite's import.meta.glob to build a map of available images.
const modules = import.meta.glob('../image/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' })

const map = {}
for (const key in modules) {
  // key will be like '../image/Rift-Valley-Chardonnay.png'
  const parts = key.split('/')
  const filename = parts[parts.length - 1]
  map[filename] = modules[key]
  map['/image/' + filename] = modules[key]
  map['../image/' + filename] = modules[key]
  map['../../image/' + filename] = modules[key]
}

export function resolveImage(value) {
  if (!value) return null
  // if it's already an absolute URL, return as-is
  if (typeof value === 'string' && /^(https?:)?\/\//.test(value)) return value
  const filename = (value || '').toString().split('/').pop()
  if (map[filename]) return map[filename]
  if (map[value]) return map[value]
  return null
}

export default map
