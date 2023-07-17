<script lang="ts" setup>
import GettingStartedDemo1 from "components/gettingStarted/gettingStartedDemo1.vue";
import GettingStartedDemo2 from "components/gettingStarted/gettingStartedDemo2.vue";
import GettingStartedDemo3 from "components/gettingStarted/gettingStartedDemo3.vue";
import GettingStartedDemo4 from "components/gettingStarted/gettingStartedDemo4.vue";
import GettingStartedDemo5 from "components/gettingStarted/gettingStartedDemo5.vue";
import GettingStartedDemo6 from "components/gettingStarted/gettingStartedDemo6.vue";
</script>

<template>
  <div class="gettingStartedWrapper">
    <GettingStartedDemo1 />
    <GettingStartedDemo2 />
    <GettingStartedDemo3 />
    <GettingStartedDemo4 />
    <GettingStartedDemo5 />
    <GettingStartedDemo6 />
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
