<template>
  <div style="height: 100%;" class="rounded-bl overflow-hidden">
    <!-- user info -->
    <div
      style="height:10%;background-color:tomato"
      class="overflow-hidden text-center white--text pt-2"
    >
      <h2>{{ username }}</h2>
      <!-- <v-text-field
        solo
        placeholder="search"
        dense
        rounded
        v-model="search"
        class="mx-1 mt-1"
      ></v-text-field> -->
    </div>

    <!-- users online -->
    <ScrollableCard
      :attributes="{
        height: '90%',
        class: 'rounded-0 rounded-bl',
      }"
    >
      <v-list dense color="transparent" class="ma-0 pa-0" :search="search">
        <v-list-item-group>
          <template v-for="(user, index) in usersOnline">
            <v-divider :key="index" v-if="index != 0"></v-divider>

            <v-list-item :key="user.id" @click="startChat(user.id)">
              <v-list-item-avatar size="30">
                <v-img :src="avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="user.username"> </v-list-item-title>
                <v-list-item-subtitle v-html="user.id"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </ScrollableCard>
  </div>
</template>

<script>
import ScrollableCard from "./ScrollableCard";
import { mapActions } from "vuex";

export default {
  name: "ChatList",

  components: {
    ScrollableCard,
  },

  data: () => ({
    search: "",
    avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
  }),

  computed: {
    username() {
      return this.$store.getters.getStateData("username");
    },

    usersOnline() {
      return this.$store.getters.getStateData("usersOnline");
    },
  },

  sockets: {
    "users-online"(users) {
      this.updateStateData({
        statename: "usersOnline",
        data: users,
      });
    },
  },

  methods: {
    ...mapActions(["updateStateData"]),

    startChat(id) {
      this.updateStateData({
        statename: "chatId",
        data: id,
      });
    },
  },
};
</script>

<style scoped></style>
