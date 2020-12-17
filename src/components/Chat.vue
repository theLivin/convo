<template>
  <div style="height: 100%;">
    <!-- top -->
    <div style="height: 10%" class="overflow-hidden">
      <v-list dense class="d-flex brand" height="100%">
        <v-list-item class="align-center">
          <template v-if="this.chatId.length > 0">
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
          </template>

          <template v-else>
            <v-list-item-avatar size="35">
              <v-img :src="myProfile.image"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Saved Messages</v-list-item-title
              >
              <v-list-item-subtitle>
                <template v-if="myProfile.username">
                  {{ usersOnline.length }} connection{{
                    usersOnline.length !== 1 ? "s" : ""
                  }}
                </template>

                <template v-else>connecting...</template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </div>

    <!-- chat area -->
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
          class="rounded-sm my-2 px-2 py-1 message mx-auto middle"
        >
          {{ item.message }}
        </div>
        <div
          v-else
          :key="i"
          class="rounded-lg my-2 px-2 py-1 message"
          :class="{ left: !item.fromMe, 'ml-auto right': item.fromMe }"
        >
          {{ item.message }}
        </div>
      </template>

      <div id="lastMsg"></div>
    </ScrollableCard>

    <!-- form -->
    <div style="height:10%;" class="rounded-0 overflow-hidden" id="formDiv">
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
              class="mx-1 mt-2"
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

    usersOnline() {
      return this.$store.getters.getStateData("usersOnline");
    },

    myProfile() {
      return this.$store.getters.myProfile;
    },

    messages() {
      const allMessages = this.$store.getters.getStateData("messages");
      const loc = this.chatId;
      const myloc = this.myProfile.id;
      if (loc.length > 0) return allMessages[loc] || [];
      else return allMessages[myloc] || [];
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
    message(payload) {
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
      if (this.newMessage.length <= 0) return;

      const message = this.newMessage;
      let recipient = this.myProfile.id;

      if (this.chatId.length > 0) {
        recipient = this.chatId;
        this.$socket.emit("message", {
          message,
          recipient,
          username: this.myProfile.username,
          image: this.myProfile.image,
        });
      }

      this.updateStateData({
        statename: "messages",
        data: {
          message,
          recipient,
          fromMe: true,
        },
      });

      this.newMessage = "";
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
    scrollToLastMsg();
  },
};
</script>

<style scoped>
#formDiv {
  background-color: var(--v-tertiary-base);
}

.chat {
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../assets/wallpaper.png"); */

  /* background-image: url("../assets/wallpaper.jpg");
  background-repeat: repeat; */
  /* background-size: cover; */
  background-color: var(--v-wall-base);
}

.message {
  width: fit-content;
  height: fit-content;
  position: relative;
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
  border-top: 11px solid var(--v-left-base);
  top: -0px;
  left: -9px;
}

.left:after {
  border-top: 10px solid var(--v-left-base);
  top: 0;
  left: -8px;
}

.right:before {
  border-top: 11px solid var(--v-right-base);
  top: 0px;
  right: -9px;
}

.right:after {
  border-top: 10px solid var(--v-right-base);
  top: 0;
  right: -8px;
}
</style>
