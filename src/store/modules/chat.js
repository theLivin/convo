const state = {
  id: "",
  username: "",
  chatId: "",
  usersOnline: [],

  messages: {},
  unread: {},
};

const getters = {
  getStateData: (state) => (target) => {
    if (target === "usersOnline")
      return state.usersOnline.filter((user) => user.id !== state.id);
    return state[target];
  },

  myProfile() {
    return state.usersOnline.filter((user) => user.id === state.id)[0] || {};
  },
};

const actions = {
  updateStateData({ commit }, payload) {
    const { statename, data } = payload;
    const { sender, recipient, fromMe } = data;
    const location = fromMe ? recipient : sender;

    if (statename === "messages") {
      commit("UPDATE_OBJECT", { ...payload, location });
    } else commit("MAKE_ASSIGNMENT", { statename, data });

    commit("UPDATE_OBJECT", { ...payload, statename: "unread", location });
  },
};

const mutations = {
  MAKE_ASSIGNMENT(state, payload) {
    const { statename, data } = payload;
    state[statename] = data;
  },

  UPDATE_OBJECT(state, payload) {
    const { data, location, statename } = payload;
    const prevData = state[statename];

    if (statename === "unread") {
      const val = prevData[location];
      if (state.chatId === location) prevData[location] = 0;
      else prevData[location] = val + 1 || 1;
    } else {
      if (!prevData[location]) prevData[location] = [];
      prevData[location].push(data);
    }

    state[statename] = { ...state[statename], ...prevData };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
