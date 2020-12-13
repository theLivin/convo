<template>
  <div style="height: 100%;">
    <!-- top -->
    <div style="height: 10%" class="overflow-hidden">
      <v-list dense color="transparent" class="d-flex" height="100%">
        <v-list-item class="align-center">
          <v-list-item-avatar size="35">
            <v-img :src="otheruser.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">{{
              otheruser.username
            }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ additionalInfo }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <!-- messages area -->
    <ScrollableCard
      :attributes="{
        height: '80%',
        class: 'rounded-0 pa-3 chat',
      }"
    >
      <template v-for="(item, i) in messages">
        <div
          v-if="item.broadcast"
          :key="i"
          class="rounded-xl my-2 pa-2 message mx-auto"
        >
          {{ item.message }}
        </div>
        <div
          v-else
          :key="i"
          class="rounded-lg my-2 pa-2 message"
          :class="{ left: !item.fromMe, 'ml-auto right': item.fromMe }"
        >
          {{ item.message }}
        </div>
      </template>

      <div id="lastMsg"></div>
    </ScrollableCard>

    <!-- message form -->
    <div
      style="height:10%; background-color: #f0f0f0"
      class="rounded-0 rounded-br overflow-hidden"
    >
      <v-form class="my-1" @submit.prevent="sendMessage">
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              dense
              solo
              hide-details
              single-line
              rounded
              flat
              class="mx-1"
              placeholder="Type a message"
              v-model="newMessage"
              @keyup="handleTyping($event, true)"
              @blur="handleTyping($event, false)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import Push from "push.js";
import ScrollableCard from "./ScrollableCard.vue";
import { mapActions } from "vuex";

function scrollToLastMsg() {
  document.getElementById("lastMsg").scrollIntoView();
}

export default {
  name: "Chat",

  components: {
    ScrollableCard,
  },

  data: () => ({
    newMessage: "",
  }),

  computed: {
    chatId() {
      return this.$store.getters.getStateData("chatId");
    },

    messages() {
      const allMessages = this.$store.getters.getStateData("messages");
      return allMessages[this.chatId] || [];
    },

    otheruser() {
      const usersOnline = this.$store.getters.getStateData("usersOnline");
      return usersOnline.filter((user) => user.id === this.chatId)[0] || {};
    },

    additionalInfo() {
      const { meta } = this.otheruser;
      if (meta && meta.isTyping) return "typing...";
      else if (!this.chatId) return null;
      else return "online";
    },
  },

  sockets: {
    connect() {
      console.log("connected");
    },

    disconnect() {
      console.log("disconnected");
    },

    established(payload) {
      this.updateStateData({
        statename: "id",
        data: payload.id,
      });
    },

    message(payload) {
      const { message, recipient, sender } = payload;
      // console.log(payload);
      console.log(recipient);
      console.log(sender);
      console.log(message);
      Push.create(message);
      this.updateStateData({
        statename: "messages",
        data: payload,
      });
    },

    typing(payload) {
      this.updateStateData({
        statename: "meta",
        data: payload,
      });
    },
  },

  methods: {
    ...mapActions(["updateStateData"]),

    sendMessage() {
      if (this.newMessage.length <= 0 || this.chatId.length <= 0) return;
      console.log(this.newMessage);

      this.$socket.emit("message", {
        message: this.newMessage,
        target: this.chatId,
      });

      this.updateStateData({
        statename: "messages",
        data: {
          message: this.newMessage,
          fromMe: true,
          recipient: this.chatId,
        },
      });

      this.newMessage = "";
    },

    requestPush() {
      Push.Permission.request();
    },

    handleTyping(event, isTyping) {
      const { value } = event.target;
      if (this.chatId.length > 0 && value.length >= 0) {
        this.$socket.emit("typing", {
          recipient: this.chatId,
          value,
          isTyping,
        });
      }
    },
  },

  mounted() {
    console.log(Push.Permission.get());
    Push.Permission.request(
      () => {
        console.log("permission granted");
      },
      () => console.log("permission not granted")
    );
    scrollToLastMsg();
  },
};
</script>

<style scoped>
.chat {
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/wallpaper.jpg"); */
  /* background-image: url("../assets/wallpaper.png");
  background-size: cover; */
  background-color: #f0f0f0;
}

.message {
  width: fit-content;
  height: fit-content;
  position: relative;
  background-color: yellow;
}

.left {
  background-color: skyblue;
}

.right {
  background-color: tomato;
}

/* create callout */
.left:before,
.left:after,
.right:before,
.right:after {
  width: 0;
  height: 0;
  content: "";
  position: absolute;
}

.left:after,
.right:after {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-radius: 15px;
}

.left:before,
.right:before {
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-radius: 15px;
}

.left:before {
  border-top: 11px solid skyblue;
  top: -0px;
  left: -9px;
}

.left:after {
  border-top: 10px solid skyblue;
  top: 0;
  left: -8px;
}

.right:before {
  border-bottom: 11px solid tomato;
  color: white;
  bottom: 0px;
  right: -9px;
}

.right:after {
  border-bottom: 10px solid tomato;
  color: white;
  bottom: 0;
  right: -8px;
}
</style>
