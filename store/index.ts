import { getBlocks } from "~/api/blocks";

export const state = () => ({
  selected: [],
  blocks: []
})

export const mutations = {
  flip(state, index) {
    state.selected = [...state.selected, index];
    if (state.selected.length <= 2) {
      const blocks = state.blocks;
      blocks.splice(index, 1, { ...blocks[index], flip: true });
      state.blocks = blocks.slice();
    }
  },
  backflip(state) {
    const blocks = state.blocks.slice();
    state.selected.map(index => {
      blocks.splice(index, 1, { ...blocks[index], flip: false });
    });
    state.blocks = blocks.slice();
    state.selected = [];
  },
  resetSelected(state) {
    state.selected = [];
  },
  setPeople(state, blocks) {
    state.blocks = blocks
  }
}

const getBlock = (state, index) => {
  return state.blocks[index];
}

export const getters = {
  winner: state => {
    return state.blocks.every(block => block.flip);
  },
  selectedBlocks: state => {
    return state.selected.map(index => state.blocks[index]);
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    commit('setPeople', await getBlocks(20))
  },
  flip({ commit }, index) {
    commit('flip', index);
  },
  backflip({ commit }, index1, index2) {
    commit('backflip', index1, index2);
  },
  resetSelected({ commit }) {
    commit('resetSelected');
  }
}
