/** Local dev servers (see package.json scripts). */
export const DOCS_DEV_URL = 'http://localhost:5177'
export const SHOWCASE_DEV_URL = 'http://localhost:5173'

/** Showcase path on the combined production deploy (same Vercel project as docs). */
export const SHOWCASE_PROD_PATH = '/showcase/'

export const LIVE_SITE = 'https://clay-ui.vercel.app'

/** Full URL so VitePress treats the showcase as external (avoids client-side 404). */
export const SHOWCASE_PROD_URL = `${LIVE_SITE}${SHOWCASE_PROD_PATH}`
