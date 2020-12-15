<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="9"
        ><v-img
          max-width="150"
          class="mx-auto mb-3 rotate"
          :src="require('@/assets/doodle.png')"
        ></v-img>

        <v-card max-width="300" class="mx-auto" flat tile>
          <v-card-text
            ><v-form @submit.prevent="onSubmit">
              <v-row>
                <v-col cols="12"
                  ><v-text-field
                    v-bind="inputProps"
                    label="enter username"
                    v-model="newUsername"
                  ></v-text-field
                ></v-col>
                <v-col cols="12">
                  <v-textarea
                    v-bind="inputProps"
                    label="something about you (optional)"
                    rows="3"
                    v-model="about"
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    type="submit"
                    depressed
                    rounded
                    block
                    class="primary text-none"
                    :disabled="newUsername.length > 0 ? false : true"
                    >connect</v-btn
                  >
                </v-col>
              </v-row>
            </v-form></v-card-text
          >
        </v-card>
      </v-col></v-row
    ></v-container
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
      rounded: true,
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
