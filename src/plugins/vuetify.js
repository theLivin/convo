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
        primary: colors.grey.lighten2,
        secondary: colors.red.lighten2,
        tertiary: colors.grey.lighten3,
      },
      dark: {
        primary: colors.green.darken1,
        secondary: colors.grey.darken3,
        tertiary: colors.grey.darken4,
      },
    },
  },
});
