import { DOCS_DEV_URL } from '../../site-urls'

/** Docs origin: full URL in local dev, same-site paths in production (/showcase deploy). */
export const DOCS_BASE = import.meta.env.DEV ? DOCS_DEV_URL : ''

/** Showcase section id → VitePress path */
export const SECTION_DOC_PATHS: Record<string, string> = {
  buttons: '/button',
  toggles: '/toggles',
  inputs: '/input',
  sliders: '/sliders',
  dropdown: '/dropdown',
  modal: '/modal',
  toast: '/toast',
  command: '/command-palette',
  skeleton: '/skeleton',
  datepicker: '/date-picker',
  tooltip: '/tooltip',
  accordion: '/accordion',
  alert: '/alert',
  badge: '/badge',
  progress: '/progress',
  checkboxradio: '/checkbox-radio',
  otp: '/otp-input',
  taginput: '/tag-input',
  popover: '/popover',
  contextmenu: '/context-menu',
  filedropzone: '/file-dropzone',
  stepper: '/stepper',
  colorpicker: '/color-picker',
  rating: '/rating',
  pagination: '/pagination',
  chat: '/chat',
  codeblock: '/code-block',
  carousel: '/carousel',
  treeview: '/tree-view',
  numberinput: '/number-input',
  sortablelist: '/sortable-list',
  richtexteditor: '/rich-text-editor',
  phoneinput: '/phone-input',
  imagegallery: '/image-gallery',
  breadcrumb: '/breadcrumb',
  resizablepanel: '/resizable-panel',
  keyboardshortcuts: '/keyboard-shortcuts',
  combobox: '/combobox',
  timepicker: '/time-picker',
  mentioninput: '/mention-input',
  signaturepad: '/signature-pad',
  mediaplayer: '/media-player',
  tour: '/tour',
  gauge: '/gauge',
  fullcalendar: '/full-calendar',
  notificationcenter: '/notification-center',
  sparkline: '/sparkline',
  leaderboard: '/leaderboard',
  activityfeed: '/activity-feed',
  datagrid: '/data-grid',
  stats: '/stat-cards',
  charts: '/charts',
  table: '/table',
  kanban: '/kanban',
  timeline: '/timeline',
  emptystates: '/empty-states',
  avatar: '/avatar',
  heatmap: '/heatmap',
  navbar: '/navbar',
  tabs: '/tabs',
  drawer: '/drawer',
  megamenu: '/mega-menu',
  bottomtabbar: '/bottom-tab-bar',
  collapsiblesidebar: '/collapsible-sidebar',
  cards: '/cards',
  authcard: '/auth-card',
}

export function getDocUrl(path: string): string {
  return `${DOCS_BASE}${path}`
}

export function getSectionDocUrl(sectionId: string): string | null {
  const path = SECTION_DOC_PATHS[sectionId]
  return path ? getDocUrl(path) : null
}
