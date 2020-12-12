<template>
  <div style="height: 100%;" class="rounded-bl overflow-hidden">
    <!-- user info -->
    <div
      style="height:15%;background-color:tomato"
      class="overflow-hidden text-center white--text pt-5"
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
        height: '85%',
        class: 'rounded-0 rounded-bl',
      }"
    >
      <v-list
        color="transparent"
        dense
        class="ma-0 pa-0 d-flex"
        :search="search"
      >
        <v-list-item-group active-class="pink--text">
          <template v-for="(user, index) in usersOnline">
            <v-list-item
              class="align-center"
              :key="user.id"
              @click="startChat(user.id)"
            >
              <v-list-item-avatar size="40">
                <v-img :src="user.image"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                  v-text="user.username"
                ></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="user.id"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-chip small rounded class="pa-2"> {{ index }} </v-chip>
              </v-list-item-action>
            </v-list-item>

            <v-divider
              v-if="index < usersOnline.length - 1"
              :key="index"
            ></v-divider>
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
    avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
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
    usersOnline(users) {
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
