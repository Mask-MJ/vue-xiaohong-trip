<template>
  <div class="favor" ref="favorRef">
    <h2>favor</h2>
    <template v-for="item in 100">
      <div>列表数据: {{ item }}</div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useScroll from "@/hooks/useScroll";

const favorRef = ref();
useScroll(favorRef);
</script>

<style less>
.favor {
  height: 300px;
  overflow-y: auto;
  background-color: #d39696;
}
</style>
