<template>
  <el-container
      style="height: 100%;" direction="vertical">
    <the-header/>
    <Ebook/>
    <the-footer/>
  </el-container>
</template>


<script lang="ts" setup>
import TheHeader from "@/components/the-header.vue";
import TheFooter from "@/components/the-footer.vue";
import Ebook from "@/views/Ebook.vue";

</script>

<style scoped>

</style>