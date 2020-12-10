<template>
  <div>
    <v-form @submit.prevent="sendMessage">
      <v-text-field
        solo
        dense
        placeholder="Start typing.."
        v-model="newMessage"
      >
      </v-text-field>
      <v-btn type="submit">send</v-btn>
    </v-form>
    <div class="messages">
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>

    <v-btn @click="requestPush">give permission to send notification</v-btn>
  </div>
</template>

<script>
import Push from "push.js";

export default {
  name: "Chat",

  data: () => ({
    newMessage: "",
    messages: [],
  }),

  sockets: {
    connect() {
      console.log("connected");
    },

    disconnect() {
      console.log("disconnected");
    },

    message({ message, userid }) {
      console.log(message);
      console.log(userid);
      Push.create(message);
      this.messages.push(message);
    },
  },

  methods: {
    sendMessage() {
      console.log(this.newMessage);
      this.$socket.emit("message", { message: this.newMessage });
    },

    requestPush() {
      Push.Permission.request();
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
  },
};
</script>

<style></style>
