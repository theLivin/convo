const state = {
  id: "",
  username: "",
  chatId: "",
  usersOnline: [],
  messages: {},
};

const getters = {
  getStateData: (state) => (target) => {
    if (target === "usersOnline")
      return state.usersOnline.filter((user) => user.id !== state.id);
    return state[target];
  },
};

const actions = {
  updateStateData({ commit }, payload) {
    const target = payload.statename;
    const { data } = payload;

    if (target === "messages") {
      commit("HANDLE_MESSAGES", payload);
      return;
    }

    commit("MAKE_UPDATE", { target, data });
  },
};

const mutations = {
  MAKE_UPDATE(state, payload) {
    state[payload.target] = payload.data;
  },

  HANDLE_MESSAGES(state, payload) {
    const { statename, data } = payload;
    const { sender, recipient, fromMe } = data;

    const location = fromMe ? recipient : sender;

    const prevMsgs = state[statename];

    if (!prevMsgs[location]) prevMsgs[location] = [];

    prevMsgs[location].push(data);

    state[statename] = { ...state[statename], ...prevMsgs };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
