<template>
  <section class="pa4 code">
    <div class="bg-white-90 pa4">
      <div class="f1">Nuxt TypeScript Starter</div>
      <div class="f3">Selected Person: {{selectedPerson.first_name}} {{selectedPerson.last_name}} is #{{selected}}</div>

    </div>
    <div class="flex flex-wrap ph2 justify-center bg-white-80">
      <Card :person="selectedPerson"></Card>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component"
import Card from "~/components/Card.vue"
import { State, Getter } from "vuex-class"

@Component({
  components: {
    Card
  }
})
export default class extends Vue {
  @State selected
  @State people
  @Getter selectedPerson
}
</script>
