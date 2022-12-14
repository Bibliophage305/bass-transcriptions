import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  plugins: ["~/plugins/quasar.client.js"],
});
