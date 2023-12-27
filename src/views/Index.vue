<template>
  <div class="p-4 text-xs">
    <h1>提示：</h1>
    <p>当日步数只能多不能少，和走路步数不叠加，谁多取谁。</p>
    <p class="text-red-600">
      防止网址被屏蔽：请务必复制保存以下地址到 文件传输助手 备用 以防万一
    </p>
  </div>
  <div class="text-center text-sm">
    <p class="mb-2">体验截止时间：{{ userInfo.vipFreeEndDay }}</p>
  </div>
  <van-field v-model="customStep" label="" type="digit" input-align="center"
             placeholder="自定义步数" />

  <div class="p-4 text-center">
    <div class="flex flex-wrap justify-center">
      <div v-for="(i,idx) in steps"
           :key="idx" @click="clickHandle(i)"
           class="mx-2 mb-4 cursor-pointer rounded-3xl bg-gradient-to-b from-purple-200 to-fuchsia-300 p-4 text-black border-2	border-purple-300	"
      >{{ i }}步
      </div>
    </div>
  </div>
  <!--  <pay-modal ref="payModalRef"></pay-modal>-->
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores";
import { computed, ref } from "vue";
import { getStepList, setStep } from "@/request/main.services";
// import PayModal from "@/components/PayModal.vue";

const userStore = useUserStore();
const userInfo = computed(() => userStore.info || {});
const steps = ref([]);
const customStep = ref();
init();

async function init() {
  await userStore.initUserInfo();
  const { data } = await getStepList();
  steps.value = data.stepList;
}

async function clickHandle(step) {
  await setStep({ step });
}
</script>
<script lang="ts">
export default {
  name: "Home"
};
</script>
<style lang="less" scoped>
:deep(.van-grid-item__content) {
  padding: 0;
}
</style>
