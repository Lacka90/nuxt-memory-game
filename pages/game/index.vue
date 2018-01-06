<template>
  <div>
    Game Win:{{ winner }}
    <div class="grid-container">
      <div class="grid-cell" 
          :class="{ flipped: block.flip }"
          :style="{ backgroundImage: 'url(' + block.image + ')' }"
          @click="select(block.index)"
          v-for="block in blocks" 
          :key="block.index">
        <div class="rotate">
          <span>{{ block.index }}</span>
        </div>
        <div class="image"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component"
import Card from "~/components/Card.vue"
import { State, Getter, Action } from "vuex-class"

@Component({
  components: {
    Card
  }
})
export default class extends Vue {
  @State blocks
  @Action flip
  @Action backflip
  @Getter winner

  timeoutId: any = undefined;

  select(index) {
    this.flip(index);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.backflip();
    }, 1000);
  }

}
</script>
<style>
  .grid-container {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(5, 1fr);
    height: 70vh;
  }
  .grid-container > .grid-cell {
    display: grid;
    position: relative;
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
