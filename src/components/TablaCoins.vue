<template>
  <div class="row">
    <div class="col">
      <div v-for="coin in coins" :key="coin.id">
        <p>{{ coin.name }}: {{ numeral(coin.priceUsd).format("$0,0.00") }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUpdated } from "@vue/runtime-core";
import numeral from "numeral";
const props = defineProps({
  coins: Array,
  calcular: Function,
});

onUpdated(() => {
  calcular();
});
</script>

<style></style>
