<template>
  <v-app id="app">
    <Home />
    <v-snackbar v-model="snackbar.value" top color="primary">
      {{ snackbar.title }}<br />
      {{ snackbar.msg }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Push from "push.js";
import Home from "@/components/Home";
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    Home,
  },

  data: () => ({
    insideApp: false,

    snackbar: {
      value: false,
      title: "",
      msg: "",
    },
  }),

  sockets: {
    connect() {
      console.log("connected");
    },

    disconnect() {
      console.log("disconnected");
    },

    established(payload) {
      this.updateStateData({
        statename: "id",
        data: payload.id,
      });
    },

    message(payload) {
      const { message, username } = payload;

      if (!this.insideApp) {
        Push.create(username, {
          body: message,
          icon: require("./assets/logo.png"),
          timeout: 5000,
          onClick: function() {
            window.focus();
            this.close();
          },
        });
      } else {
        const audio = new Audio(require("@/assets/notification.mp3"));
        audio.play();
        this.snackbar.title = username;
        this.snackbar.msg = message;
        this.snackbar.value = true;
      }
    },
  },

  methods: {
    ...mapActions(["updateStateData"]),
  },

  mounted() {
    window.addEventListener("blur", () => {
      this.insideApp = false;
    });

    window.addEventListener("focus", () => {
      this.insideApp = true;
    });
  },
};
</script>

<style>
* {
  font-family: "Quicksand", sans-serif;
}

/* customize scrollbar */
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #999 #f0f0f0;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #f0f0f0;
}

*::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 20px;
}
</style>
