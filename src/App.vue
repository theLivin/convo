<template>
  <v-app>
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8">
          <Home />

          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-toolbar dense>
                <v-spacer /><v-toolbar-title>convo</v-toolbar-title><v-spacer />
              </v-toolbar>

              <v-card-text class="py-6">
                <v-form @submit.prevent="onSubmit">
                  <v-text-field
                    single-line
                    hide-details
                    rounded
                    dense
                    outlined
                    label="Enter username"
                    v-model="newUsername"
                  ></v-text-field>

                  <v-text-field
                    single-line
                    hide-details
                    rounded
                    dense
                    outlined
                    label="What's on your mind?"
                    v-model="about"
                  ></v-text-field>

                  <v-btn type="submit" block rounded class="primary mt-3"
                    >join</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
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
  }),

  computed: {
    username() {
      return this.$store.getters.getStateData("username");
    },
  },

  sockets: {
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
