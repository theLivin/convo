<template>
  <div
    style="height: 100%;position:relative"
    class="rounded-bl overflow-hidden"
  >
    <!-- upper -->
    <div style="height:10%;" class="overflow-hidden">
      <v-list dense class="d-flex tertiary" height="100%">
        <v-list-item class="align-center">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            class="mr-1"
          ></v-app-bar-nav-icon>
          <v-spacer />

          <v-icon class="mr-3" @click="toggleDarkTheme"
            >mdi-theme-light-dark</v-icon
          >
          <v-icon @click="viewSavedMsgs">mdi-bookmark</v-icon>
        </v-list-item></v-list
      >
    </div>

    <!-- lower-->
    <ScrollableCard
      :attributes="{
        height: '90%',
        class: 'rounded-0 rounded-bl',
      }"
    >
      <ChatList />
    </ScrollableCard>

    <v-navigation-drawer v-model="drawer" absolute temporary width="100%">
      <Drawer />
    </v-navigation-drawer>
  </div>
</template>

<script>
import ChatList from "./ChatList";
import Drawer from "./Drawer";
import ScrollableCard from "./ScrollableCard";

import { mapActions } from "vuex";

export default {
  name: "Sidebar",

  components: {
    ChatList,
    Drawer,
    ScrollableCard,
  },

  data: () => ({
    search: "",
    drawer: false,
  }),

  computed: {
    username() {
      return this.$store.getters.getStateData("username");
    },

    usersOnline() {
      return this.$store.getters.getStateData("usersOnline");
    },
  },

  methods: {
    ...mapActions(["updateStateData"]),

    viewSavedMsgs() {
      this.updateStateData({
        statename: "chatId",
        data: "",
      });
    },

    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style scoped></style>
