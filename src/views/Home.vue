<template>
  <el-container
      style="height: 100%;" direction="vertical">
    <the-header/>
    <el-container>
      <el-aside width="200px" style="border-right: 1px solid lightgray">
        <el-scrollbar>
          <el-menu>
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <message/>
                </el-icon>
                Navigator One
              </template>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        main12
      </el-main>
    </el-container>
    <the-footer/>
  </el-container>
</template>


<script lang="ts" setup>
import TheHeader from "@/components/the-header.vue";
import TheFooter from "@/components/the-footer.vue";
</script>

<style scoped>

</style>