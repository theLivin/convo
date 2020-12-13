<template>
  <div
    style="height: 100%;position:relative"
    class="rounded-bl overflow-hidden"
  >
    <!-- user info -->
    <div style="height:11%; background-color:tomato" class="overflow-hidden">
      <v-list dense color="transparent" class="d-flex" height="100%">
        <v-list-item class="align-center">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            class="mr-1"
          ></v-app-bar-nav-icon>
          <v-text-field
            filled
            rounded
            placeholder="search"
            dense
            hide-details
            single-line
            v-model="search"
          ></v-text-field> </v-list-item
      ></v-list>
    </div>

    <!-- users online -->
    <ScrollableCard
      :attributes="{
        height: '89%',
        class: 'rounded-0 rounded-bl',
      }"
    >
      <ChatList />
    </ScrollableCard>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <Drawer />
    </v-navigation-drawer>
  </div>
</template>

<script>
import ChatList from "./ChatList";
import Drawer from "./Drawer";
import ScrollableCard from "./ScrollableCard";

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
};
</script>

<style scoped></style>
