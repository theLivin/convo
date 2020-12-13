<template>
  <v-list color="transparent" dense class="ma-0 pa-0">
    <v-list-item-group v-if="username.length > 0">
      <template v-for="(user, index) in usersOnline">
        <v-list-item :key="user.id" @click="startChat(user.id)">
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
              v-text="messagePreview(user.id)"
            ></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-chip
              v-if="unread[user.id] > 0"
              small
              rounded
              class="primary white--text pa-2"
            >
              {{ unread[user.id] }}
            </v-chip>
          </v-list-item-action>
        </v-list-item>

        <v-divider
          v-if="index < usersOnline.length - 1"
          :key="index"
        ></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ChatList",

  computed: {
    usersOnline() {
      return this.$store.getters.getStateData("usersOnline");
    },

    unread() {
      return this.$store.getters.getStateData("unread");
    },

    messages() {
      return this.$store.getters.getStateData("messages");
    },

    username() {
      return this.$store.getters.getStateData("username");
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

    messagePreview(id) {
      if (!this.messages[id]) return null;
      else {
        const msgs = this.messages[id];
        const len = msgs.length;
        return msgs[len - 1].message;
      }
    },
  },
};
</script>

<style></style>
