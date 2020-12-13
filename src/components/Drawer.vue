<template>
  <div class="ma-0">
    <v-img
      height="150px"
      src="https://loremflickr.com/320/240/sky,animals/all"
      gradient="to top right,rgba(108, 128, 243, 0.33), rgba(25,32,72,.7)"
    >
      <div class="d-flex flex-no-wrap justify-space-between pa-3 white--text">
        <div class="text-center">
          <v-avatar size="75">
            <v-img :src="myProfile.image"></v-img>
          </v-avatar>
          <h4 class="white--text">{{ myProfile.username }}</h4>
        </div>

        <div>
          <v-card-actions>
            <v-btn icon @click="toggleNotify()" color="white" small>
              <v-icon class="notification" v-if="notify">mdi-bell-ring</v-icon>
              <v-icon v-else>mdi-bell-off</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-img>
    <div class="pa-3">
      <p class="grey--text mb-1">About</p>
      <p>{{ myProfile.about }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Drawer",

  data: () => ({
    notify: false,
  }),

  computed: {
    myProfile() {
      return this.$store.getters.myProfile;
    },
  },

  methods: {
    toggleNotify() {
      this.notify = !this.notify;
    },
  },
};
</script>

<style scoped>
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
