<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component"
import Navbar from "~/components/Navbar.vue"

@Component({
  components: {
    Navbar
  }
})
export default class extends Vue {}
</script>
