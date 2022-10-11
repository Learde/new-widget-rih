<template>
  <div class="rih-comp">{{ hey }}</div>
</template>

<script setup>
import { ref } from "vue";

const hey = ref("hey");
</script>

<style>
.rih-comp {
  font-size: 32px;
}
</style>
