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
        brand: "#FAFBFB",
        right: "#EFFFDE",
        left: "#FFFFFF",
        middle: "#AEBAC3",
        tertiary: "#FAFBFB",
        wall: colors.indigo.lighten5,
      },
      dark: {
        brand: "#17212B",
        right: "#1073AC",
        left: "#3B5564",
        middle: "#17212B",
        tertiary: colors.grey.darken4,
        wall: "#131A22",
      },
    },
  },
});
