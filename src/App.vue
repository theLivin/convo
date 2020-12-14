<template>
  <v-app>
    <Home />
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
  font-family: "Nunito", sans-serif;
}

/* customize scrollbar */
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: orange;
}

*::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 20px;
  border: 3px solid orange;
}

/* handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
