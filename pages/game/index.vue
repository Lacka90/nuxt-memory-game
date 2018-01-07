<template>
  <div>
    <div class="winner" v-if="winner">
      <div>
        <h2>Winner</h2>
        <b-button variant="primary" @click="restart">
          Play again
        </b-button>
      </div>
    </div>
    <div class="grid-container">
      <div class="grid-cell" 
          :class="{ flipped: block.flip }"
          :style="{ backgroundImage: 'url(' + block.image + ')' }"
          @click="select(index)"
          v-for="(block, index) in blocks" 
          :key="block.index">
        <div class="rotate">
          <span>{{ index + 1 }}</span>
        </div>
        <div class="image"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component"
import { State, Getter, Action } from "vuex-class"
import {} from '~/store';

@Component({})
export default class extends Vue {
  @State blocks
  @Action flip
  @Action backflip
  @Action resetSelected
  @Action nuxtServerInit
  @Getter winner
  @Getter selectedBlocks

  select(index) {
    if (this.selectedBlocks.length < 2) {
      this.flip(index);
    }
    
    if (this.selectedBlocks.length === 2) {
      const block1 = this.selectedBlocks[0];
      const block2 = this.selectedBlocks[1];
      if (block1.guess === block2.guess) {
        return this.resetSelected();
      }
      setTimeout(this.backflip, 1000);
    }
  }
  restart() {
    this.nuxtServerInit();
  }
}
</script>
<style>
  .winner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
  .winner > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .grid-container {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(5, 1fr);
    height: 70vh;
  }
  .grid-container > .grid-cell {
    display: grid;
    position: relative;
    border: 1px solid grey;
  }

  .grid-container > .grid-cell > .rotate {
    display: grid;
    transition: all 500ms linear;
    backface-visibility: hidden;
    background-color: blue;
  }

  .grid-container > .grid-cell > .image {
    display: grid;
    transition: all 500ms linear;
    backface-visibility: hidden;
    background-size: contain;
    -webkit-transform: rotateX(180deg); /* Safari */
    transform: rotateX(180deg);
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .grid-container > .grid-cell.flipped > .rotate {
    -webkit-transform: rotateX(180deg); /* Safari */
    transform: rotateX(180deg);
  }

  .grid-container > .grid-cell.flipped > .image {
    -webkit-transform: rotateX(0deg); /* Safari */
    transform: rotateX(0deg);
  }

  .grid-container > .grid-cell > .rotate > span {
    align-self: center;
    justify-self: center;
  }
</style>
