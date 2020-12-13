<template>
  <v-card :height="containerHeight" elevation="4">
    <v-row no-gutters>
      <!-- top bar -->
      <v-col cols="12">
        <v-card
          color="primary"
          dark
          :height="topbarHeight"
          class="rounded-0 rounded-t d-flex align-center justify-center"
        >
          <h3 class="font-weight-regular">convo</h3>
        </v-card>
      </v-col>

      <!-- left pane -->
      <v-col cols="4">
        <v-card :height="paneHeight" class="rounded-0 rounded-bl"
          ><Sidebar
        /></v-card>
      </v-col>

      <!-- right pane -->
      <v-col cols="8">
        <v-card :height="paneHeight" class="rounded-0 rounded-br"
          ><Chat
        /></v-card>
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
    containerHeight: "80vh",
    topbarHeight: "5vh",
    paneHeight: "75vh",
  }),
};
</script>

<style scoped></style>
