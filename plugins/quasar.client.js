import "quasar/dist/quasar.prod.css";
import Quasar from "quasar/dist/quasar.umd.prod.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    config: {
      // options
    },
  });
});
