<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="5">
        <v-form @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="12"
              ><h2 class="text-center primary--text font-weight-bold">
                CONVO
              </h2></v-col
            >
            <v-col cols="12"
              ><v-text-field
                v-bind="inputProps"
                label="Enter username"
                v-model="newUsername"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-textarea
                v-bind="inputProps"
                label="Say something"
                rows="3"
                v-model="about"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-btn
                type="submit"
                depressed
                block
                class="primary"
                :disabled="newUsername.length > 0 ? false : true"
                >Connect</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row></v-container
  >
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  data: () => ({
    dialog: true,
    newUsername: "",
    about: "",
    insideApp: false,
    snackbar: true,

    inputProps: {
      "single-line": true,
      "hide-details": true,
      dense: true,
      outlined: true,
    },
  }),

  computed: {
    username() {
      return this.$store.getters.getStateData("username");
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
};
</script>

<style scoped>
.rotate {
  animation: rotation 60s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
