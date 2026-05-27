import { defineConfig } from 'vitepress'
import { SHOWCASE_DEV_URL, SHOWCASE_PROD_PATH, SHOWCASE_PROD_URL } from '../../site-urls'

const ui = [
  { text: 'Button', link: '/button' },
  { text: 'Toggles', link: '/toggles' },
  { text: 'Input & Textarea', link: '/input' },
  { text: 'Sliders', link: '/sliders' },
  { text: 'Dropdown', link: '/dropdown' },
  { text: 'Combobox', link: '/combobox' },
  { text: 'Modal', link: '/modal' },
  { text: 'Toast', link: '/toast' },
  { text: 'Command Palette', link: '/command-palette' },
  { text: 'Skeleton', link: '/skeleton' },
  { text: 'Date Picker', link: '/date-picker' },
  { text: 'Time Picker', link: '/time-picker' },
  { text: 'Tooltip', link: '/tooltip' },
  { text: 'Popover', link: '/popover' },
  { text: 'Accordion', link: '/accordion' },
  { text: 'Alert', link: '/alert' },
  { text: 'Badge', link: '/badge' },
  { text: 'Progress', link: '/progress' },
  { text: 'Checkbox & Radio', link: '/checkbox-radio' },
  { text: 'OTP Input', link: '/otp-input' },
  { text: 'Tag Input', link: '/tag-input' },
  { text: 'Mention Input', link: '/mention-input' },
  { text: 'Number Input', link: '/number-input' },
  { text: 'Phone Input', link: '/phone-input' },
  { text: 'Context Menu', link: '/context-menu' },
  { text: 'File Dropzone', link: '/file-dropzone' },
  { text: 'Stepper', link: '/stepper' },
  { text: 'Color Picker', link: '/color-picker' },
  { text: 'Rating', link: '/rating' },
  { text: 'Pagination', link: '/pagination' },
  { text: 'Breadcrumb', link: '/breadcrumb' },
  { text: 'Chat', link: '/chat' },
  { text: 'Code Block', link: '/code-block' },
  { text: 'Carousel', link: '/carousel' },
  { text: 'Tree View', link: '/tree-view' },
  { text: 'Sortable List', link: '/sortable-list' },
  { text: 'Rich Text Editor', link: '/rich-text-editor' },
  { text: 'Image Gallery', link: '/image-gallery' },
  { text: 'Resizable Panel', link: '/resizable-panel' },
  { text: 'Keyboard Shortcuts', link: '/keyboard-shortcuts' },
  { text: 'Signature Pad', link: '/signature-pad' },
  { text: 'Media Player', link: '/media-player' },
  { text: 'Tour', link: '/tour' },
]

const data = [
  { text: 'Avatar', link: '/avatar' },
  { text: 'Gauge', link: '/gauge' },
  { text: 'Sparkline', link: '/sparkline' },
  { text: 'Stat Cards', link: '/stat-cards' },
  { text: 'Charts', link: '/charts' },
  { text: 'Table', link: '/table' },
  { text: 'Data Grid', link: '/data-grid' },
  { text: 'Kanban', link: '/kanban' },
  { text: 'Timeline', link: '/timeline' },
  { text: 'Heatmap', link: '/heatmap' },
  { text: 'Empty States', link: '/empty-states' },
  { text: 'Activity Feed', link: '/activity-feed' },
  { text: 'Full Calendar', link: '/full-calendar' },
  { text: 'Notification Center', link: '/notification-center' },
  { text: 'Leaderboard', link: '/leaderboard' },
]

const nav = [
  { text: 'Tabs', link: '/tabs' },
  { text: 'Drawer', link: '/drawer' },
  { text: 'Navbar', link: '/navbar' },
  { text: 'Mega Menu', link: '/mega-menu' },
  { text: 'Bottom Tab Bar', link: '/bottom-tab-bar' },
  { text: 'Collapsible Sidebar', link: '/collapsible-sidebar' },
]

const cards = [
  { text: 'Cards', link: '/cards' },
  { text: 'Auth Card', link: '/auth-card' },
]

export default defineConfig(({ command }) => {
  const isProductionBuild = command === 'build'
  const showcaseUrl = isProductionBuild ? SHOWCASE_PROD_URL : SHOWCASE_DEV_URL

  return {
    title: 'Clay UI',
    description: 'Soft, pastel React component library built with Tailwind CSS',
    lang: 'en-US',
    head: [
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      [
        'link',
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&family=Varela+Round&display=swap',
        },
      ],
    ],
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: [/^https?:\/\/localhost/, /^\/showcase\//],
    transformPageData(pageData) {
      if (!isProductionBuild || pageData.relativePath !== 'index.md') return
      const hero = pageData.frontmatter?.hero as
        | { actions?: { text?: string; link?: string }[] }
        | undefined
      hero?.actions?.forEach((action) => {
        if (action.text === 'Live showcase') action.link = SHOWCASE_PROD_URL
      })
    },
    vite: {
      server: { port: 5177, strictPort: true },
      preview: { port: 4174, strictPort: true },
    },
    themeConfig: {
      logo: { text: 'Clay UI' },
      nav: [
        { text: 'Components', link: '/' },
        {
          text: 'Live showcase',
          link: showcaseUrl,
          ...(isProductionBuild ? {} : { target: '_blank' as const }),
        },
      ],
      sidebar: [
        { text: 'Getting started', items: [{ text: 'Introduction', link: '/' }] },
        { text: 'UI Elements', items: ui },
        { text: 'Data', items: data },
        { text: 'Navigation', items: nav },
        { text: 'Cards', items: cards },
      ],
      footer: {
        message: 'Clay UI · React + TypeScript + Tailwind',
        copyright: 'MIT',
      },
      search: { provider: 'local' },
    },
  }
})
