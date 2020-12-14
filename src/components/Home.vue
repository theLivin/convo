<template>
  <v-card :height="containerHeight" elevation="4">
    <v-row no-gutters>
      <!-- left pane -->
      <v-col cols="3">
        <v-card :height="paneHeight" class="rounded-0"><Sidebar /></v-card>
      </v-col>

      <!-- right pane -->
      <v-col cols="9">
        <v-card :height="paneHeight" class="rounded-0"><Chat /></v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Chat from "./Chat";
import Sidebar from "./Sidebar";

export default {
  name: "Home",

  components: {
    Chat,
    Sidebar,
  },

  data: () => ({
    containerHeight: "100vh",
    // topbarHeight: "5vh",
    paneHeight: "100vh",
  }),
};
</script>

<style scoped></style>
