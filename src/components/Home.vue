<template>
  <v-card :height="containerHeight" elevation="4">
    <v-row no-gutters>
      <!-- top bar -->
      <v-col cols="12">
        <v-card
          color="orange lighten-2 white--text"
          :height="topbarHeight"
          class="rounded-0 rounded-t d-flex align-center justify-center"
        >
          <h2>convo</h2>
        </v-card>
      </v-col>

      <!-- left pane -->
      <v-col cols="4">
        <v-card :height="paneHeight" class="rounded-0 rounded-bl"
          ><ChatList
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
import ChatList from "./ChatList";

export default {
  name: "Home",

  components: {
    Chat,
    ChatList,
  },

  data: () => ({
    containerHeight: "80vh",
    topbarHeight: "5vh",
    paneHeight: "75vh",
  }),
};
</script>

<style scoped></style>
