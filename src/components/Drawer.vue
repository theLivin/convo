<template>
  <div class="ma-0">
    <v-card color="tertiary" flat tile>
      <!-- <v-img
      height="150px"
      src="https://loremflickr.com/320/240/sky,animals/all"
      gradient="to top right,rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)"
    > -->
      <div class="d-flex flex-no-wrap justify-space-between pa-3">
        <div class="text-center">
          <v-avatar size="75">
            <v-img :src="myProfile.image"></v-img>
          </v-avatar>
          <h4>{{ myProfile.username }}</h4>
        </div>

        <div>
          <v-card-actions>
            <v-btn icon @click="toggleNotify()" class="mt-2" small>
              <v-icon class="notification" v-if="notify">mdi-bell-ring</v-icon>
              <v-icon v-else>mdi-bell-off</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
      <!-- </v-img> -->
    </v-card>

    <div class="pa-3" v-if="myProfile.about && myProfile.about.length > 0">
      <p class="mb-1">About</p>
      <p>{{ myProfile.about }}</p>
    </div>

    <div class="footer">
      <v-card color="tertiary" flat tile class="pa-2">
        <a
          href="https://github.com/theLivin/convo"
          class="d-flex align-center justify-center"
          style="text-decoration:none; color:inherit"
          target="_blank"
        >
          <v-icon class="mr-1">mdi-github</v-icon>
          <span>theLivin</span>
        </a>
      </v-card>
    </div>
  </div>
</template>

<script>
import Push from "push.js";

export default {
  name: "Drawer",

  data: () => ({
    notify: false,

    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),

  computed: {
    myProfile() {
      return this.$store.getters.myProfile;
    },
  },

  methods: {
    toggleNotify() {
      Push.Permission.request(
        () => {
          //granted
          this.notify = true;
        },
        () => {
          //denied
          this.notify = false;
        }
      );
    },
  },

  mounted() {
    this.notify = Push.Permission.has();
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.notification {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
