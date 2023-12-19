<template>
  <div>{{ userInfo }}</div>

</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { getUserInfo } from "../request/login.services";

const userInfo = reactive({});
init();

async function init() {
  const { data } = await getUserInfo();
  Object.assign(userInfo, data);
}
</script>
<script lang="ts">
export default {
  name: "Home"
};
</script>
<style>
</style>
