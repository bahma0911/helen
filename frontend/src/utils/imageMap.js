// Utility to resolve image paths stored in the DB to Vite-imported URLs.
// It uses Vite's import.meta.glob to build a map of available images.
// Images are stored in `frontend/image` (sibling to `src`), so glob from here
// must go up two levels to reach that folder from `src/utils`.
const modules = import.meta.glob('../../image/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' })

const map = {}
for (const key in modules) {
  // key will be like '../image/Rift-Valley-Chardonnay.png'
  const parts = key.split('/')
  const filename = parts[parts.length - 1]
  map[filename] = modules[key]
  map['/image/' + filename] = modules[key]
  map['../image/' + filename] = modules[key]
  map['../../image/' + filename] = modules[key]
  map['../../../image/' + filename] = modules[key]
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
