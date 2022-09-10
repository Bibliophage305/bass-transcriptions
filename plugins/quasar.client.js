import "quasar/dist/quasar.prod.css";
import Quasar from "quasar/dist/quasar.umd.prod.js";
import { matAllInbox } from '@quasar/extras/material-icons'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    config: {
      // options
    },
  });
});
