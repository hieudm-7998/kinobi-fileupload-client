export default {
  ssr: false,
  head: {
    titleTemplate: 'hieudm-7998 • %s',
    title: 'File Upload Demo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['~/assets/css/main.css'],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxt/postcss8',
    '@nuxtjs/tailwindcss',
  ],
  modules: [],
  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    theme: {
      dark: false,
    },
  },
  build: {
    transpile: ['zod'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
}
