<template>
  <van-dialog
    width="480px"
    v-model:show="visible"
    title="长按识别"
  >
    <img :src="url" class="w-full m-4">
    <template #footer>
<!--      <div class="text-right px-8 py-4">-->
<!--        <van-button type="primary" @click="onOk" size="small">确定</van-button>-->
<!--      </div>-->
    </template>
  </van-dialog>
</template>

<script lang="ts" setup>
import { computed, defineExpose, ref } from "vue";
import { useUserStore } from "@/stores";
import QRCode from "qrcode";

const userStore = useUserStore();
const visible = ref(false);
let resolve, reject;
const url = computed(() => {
  return userStore.info.qr || QRCode.toDataURL(userStore.info.qr);
});

function init() {
  visible.value = true;
  return new Promise((resolve, reject) => {
    resolve = resolve;
    reject = reject;
  });
}

function onOk() {
  resolve(123);
  visible.value = false;
}

function onCancel() {
  reject();
  visible.value = false;
}

function reset() {
}

defineExpose({ init });
</script>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StepModal"
});
</script>
<style lang="less">
</style>
