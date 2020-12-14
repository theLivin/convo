<template>
  <!-- <v-dialog v-model="dialog" persistent max-width="320">
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
                >connect</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog> -->
  <div style="width:100%;height:100%;background-color:red;" class="d-flex">
    <v-row align="center" justify="center">
      <v-col cols="8"></v-col>
    </v-row>
  </div>
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

<style></style>
