import Vue from "vue";
import App from "./App.vue";
import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import vuetify from "./plugins/vuetify";
import store from "./store";

Vue.config.productionTip = false;

const options = {
  withCredentials: true,
};

const url = process.env.VUE_APP_SERVER_URL;

Vue.use(
  new VueSocketIO({
    // debug: true,
    connection: SocketIO(url, options),
  })
);

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
