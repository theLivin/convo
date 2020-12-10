<template>
  <v-app>
    <v-main>
      <Chat />
    </v-main>
  </v-app>
</template>

<script>
// import Preview from "@/components/Preview";
import Chat from "@/components/Chat";

export default {
  name: "App",

  components: {
    // Preview,
    Chat,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.u-split {
  height: 100%;
  /* width: 50%; */
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 4rem;
}

.u-left {
  left: 0;
}

.u-right {
  right: 0;
}
</style>
