import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

import colors from "vuetify/lib/util/colors";

export default new Vuetify({
  theme: {
    dark: false,

    options: {
      customProperties: true,
    },

    themes: {
      light: {
        brand: "#EDEDED",
        right: "#DCF8C6",
        left: "#FFFFFF",
        middle: "#E1F3FB",
        tertiary: "#F0F0F0",
        wall: "#E5DDD5", //colors.indigo.lighten5,
      },
      dark: {
        brand: "#2A2F32",
        right: "#056162",
        left: "#262D31",
        middle: "#1E2A30",
        tertiary: colors.grey.darken4, //'#1E2428'
        wall: "#0D1418",
      },
    },
  },
});
