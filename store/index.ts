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
    const b1 = getBlock(state, state.selected[0]);
    const b2 = getBlock(state, state.selected[1]);
    if (b1 && b2) {
      if (b1.guess === b2.guess) {
        state.selected = [];
      } else {
        const blocks = state.blocks.slice();
        blocks.splice(b1.index, 1, { ...blocks[b1.index], flip: false });
        blocks.splice(b2.index, 1, { ...blocks[b2.index], flip: false });
        state.blocks = blocks.slice();
        state.selected = [];
      }
    }
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
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    commit('setPeople', await getBlocks(20))
  },
  flip({ commit }, index) {
    commit('flip', index)
  },
  backflip({ commit }) {
    commit('backflip')
  }
}
