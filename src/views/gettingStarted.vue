<script lang="ts" setup>
import GettingStartedDemo1 from "components/gettingStartedDemo1.vue";
import GettingStartedDemo2 from "components/gettingStartedDemo2.vue";
</script>

<template>
  <div class="gettingStartedWrapper">
    <GettingStartedDemo1 />
    <GettingStartedDemo2 />
  </div>
</template>

<style lang="less" scoped>
.gettingStartedWrapper {
  height: 100%;
  overflow-y: auto;
}

.gettingStartedDemo {
  margin-bottom: 100 * @vpx;
}
</style>
