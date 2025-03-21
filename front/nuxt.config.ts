// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxtjs/tailwindcss', '@formkit/auto-animate/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseURL: 'http://127.0.0.1:8000' // Значение по умолчанию, если переменная окружения не определена
    }
  }
})