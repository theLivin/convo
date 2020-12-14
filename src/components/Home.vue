<template>
  <v-card :height="containerHeight" elevation="4">
    <v-row no-gutters>
      <!-- left pane -->
      <v-col cols="3">
        <v-card :height="paneHeight" class="rounded-0"><Sidebar /></v-card>
      </v-col>

      <!-- right pane -->
      <v-col cols="9">
        <v-card :height="paneHeight" class="rounded-0">
          <Connect v-if="!connected" />
          <Chat v-else />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Chat from "./Chat";
import Connect from "./Connect";
import Sidebar from "./Sidebar";

export default {
  name: "Home",

  components: {
    Chat,
    Connect,
    Sidebar,
  },

  data: () => ({
    containerHeight: "100vh",
    // topbarHeight: "5vh",
    paneHeight: "100vh",
  }),

  computed: {
    connected() {
      const username = this.$store.getters.getStateData("username");
      if (username && username.length > 0) return true;
      else return false;
    },
  },
};
</script>

<style scoped></style>
