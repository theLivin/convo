<template>
  <v-app>
    <!-- <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" md="9"> -->
    <Home />

    <v-dialog v-model="dialog" persistent max-width="320">
      <v-card>
        <v-card-title class="primary--text font-weight-bold">
          <v-spacer />convo<v-spacer />
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="onSubmit">
            <v-row>
              <v-col cols="12"
                ><v-text-field
                  v-bind="inputProps"
                  label="username"
                  v-model="newUsername"
                ></v-text-field
              ></v-col>
              <v-col cols="12">
                <v-text-field
                  v-bind="inputProps"
                  label="something about you"
                  v-model="about"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-btn
                  type="submit"
                  depressed
                  class="primary text-none"
                  :disabled="newUsername.length > 0 ? false : true"
                  >join</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- </v-col>
      </v-row>
    </v-container> -->
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
    dialog: true,
    newUsername: "",
    about: "",
    insideApp: false,
    snackbar: true,

    inputProps: {
      "single-line": true,
      "hide-details": true,
      // rounded: true,
      dense: true,
      outlined: true,
    },
  }),

  computed: {
    username() {
      return this.$store.getters.getStateData("username");
    },
  },

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

    onSubmit() {
      if (this.newUsername.length <= 0) return;

      this.updateStateData({
        statename: "username",
        data: this.newUsername,
      });
      this.updateStateData({
        statename: "about",
        data: this.about,
      });

      this.$socket.emit("joined", {
        username: this.username,
        about: this.about,
      });
      this.dialog = false;
    },
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
</style>
