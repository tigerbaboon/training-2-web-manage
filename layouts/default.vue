<template>
  <TopNav @updateShow="handleUpdateShow"/>
  <div class="flex">
    <LogNav :show="show" />
      <slot></slot>
  </div>
</template>

<script setup lang="ts" >

definePageMeta({
  middleware: "auth",
});




const show = ref<boolean>(true);

const handleUpdateShow = (newValue: boolean) => {
  show.value = newValue;
};
</script>

