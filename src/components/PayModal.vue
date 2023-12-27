<template>
  <van-dialog
    v-model:show="show"
    :show-cancel-button="false"
    :show-confirm-button="false"
  >
    <template v-if="free.show">
      <div v-if="free.loading" class="my-4 mx-auto w-4/5 text-center">
        <van-circle
          v-model:current-rate="free.currentRate"
          :clockwise="false"
          :color="free.gradientColor"
          :rate="100"
          :speed="30"
          :text="free.text"
          size="120px"
        />
      </div>
      <img v-else id="qrcode" :src="free.src" class="my-4 mx-auto w-4/5" />
      <div class="my-4 px-4 text-left text-sm leading-7 text-gray-500">
        <p>1.长按图片 "识别图中二维码"</p>
        <p>2.点击 "绑定设备" 后，点击返回</p>
        <p>
          3.不要在华米科技内操作，返回这里提示成功后，自动进入第三步，再取消关注
        </p>
        <p>如无绑定设备按钮，请取消关注后重试</p>
        <p>凌晨不同步</p>
      </div>
      <div class="space-around block-btn mt-4 flex flex-wrap">
        <van-button class="w-1/2" type="default" @click="free.closeHandle()"
        >重新选择
        </van-button>
        <van-button class="w-1/2" color="#FBBF24" @click="free.go()"
        >操作完成
        </van-button>
      </div>
    </template>
    <template v-else>
      <img class="mx-auto my-4 w-4/5" src="@/assets/sad.gif" />
      <template v-if="!noPay.show">
        <div class="my-4 px-10 text-left text-base text-gray-500">
          <van-divider class="border-gray-700" dashed></van-divider>
          <p class="my-2 text-center tracking-widest text-gray-900">
            服务器超载，捐赠者才可以使用
          </p>
          <van-divider class="border-gray-700" dashed></van-divider>
          <p v-for="i in store.price.slice(0, 3)" class="mt-4 text-left">
            只需要捐赠
            <span class="text-red-600">{{ i.price_yuan }} </span> ，获得
            <span class="text-red-600">{{ i.miao_su }}</span
            >权！
          </p>
        </div>
        <div class="space-around block-btn mt-4 flex flex-wrap">
          <van-button
            class="w-1/2 text-gray-800"
            color="#ddd"
            @click="noPay.showHandle()"
          >我不捐赠
          </van-button>
          <van-button
            v-for="(i, idx) in store.price"
            :color="priceColor[idx]"
            class="w-1/2 text-gray-800"
            @click="pay(i.price_yuan, i.type)"
          >
            捐赠 ¥{{ i.price_yuan }}({{ i.kuo_hao }})
          </van-button>
        </div>
      </template>
      <template v-else>
        <p class="mt-4 text-center font-bold">免费天数用完了</p>
        <div class="space-around block-btn mt-4 flex flex-wrap">
          <van-button class="w-1/2" type="default" @click="noPay.closeHandle()"
          >取消
          </van-button>
          <van-button class="w-1/2" color="#FBBF24" @click="noPay.go()"
          >继续免费体验
          </van-button>
        </div>
      </template>
    </template>
  </van-dialog>

</template>
<script setup>
import { onBeforeUnmount, onMounted, computed, reactive, ref } from "vue";
// import {
//   createOrderBase,
//   getOneStep,
//   getStepDetail,
//   updateStepV2
// } from "../http/services.js";
// import { useUserStore } from "../store/index.js";
import QRCode from "qrcode";

import { showNotify } from "vant";
import { setStep } from "@/request/main.services";

const show = ref(false);
// const store = useUserStore();

const priceColor = ["#f5f4de", "#c8def3", "#8fbfe5", "#fce8cb", "#eecf4f"];
const free = reactive({
  show: false,
  stepId: "",
  applyId: "",
  src: "",
  currentRate: 0,
  text: computed(() => free.currentRate.toFixed(0) + "%"),
  loading: false,
  gradientColor: {
    "0%": "#3fecff",
    "100%": "#6149f6"
  },
  closeHandle: () => {
    free.src = "";
    show.value = false;
    free.currentRate = 0;
  },
  go: () => {
    showNotify({
      type: "warning",
      message:
        "请长按上图识别，绑定设备后，不要停留，不要在华米科技内操作，立即返回"
    });
  }
});
const init = async (step, stepId) => {
  await setStep(step);

  // try {
  //   let res = null;
  //   if (stepId) {
  //     res = await getStepDetail({ stepId });
  //     free.stepId = stepId;
  //   } else {
  //     res = await getOneStep({ step });
  //     free.stepId = res.data.randomStepId;
  //   }
  //   if (res.data === "ci_shu_error") {
  //     free.show = false;
  //
  //     // newpay.show = true
  //     // newpay.active = store.price.findIndex(i => i.tag_tuijian === 1)
  //   } else {
  //     free.applyId = res.data.applyId;
  //     const url = await QRCode.toDataURL(res.data.q);
  //     free.src = url;
  //     free.show = true;
  //   }
  //   show.value = true;
  // } catch {
    // if (!res.data) {
    //   show.value = false
    //   free.show = false
    //   return
    // }
  // }
};
defineExpose({ init });

const noPay = reactive({
  show: false,
  showHandle: () => {
    noPay.show = true;
  },
  closeHandle: () => {
    noPay.show = false;
    show.value = false;
  },
  go: () => {
    store.toTab("/user");
  }
});
const pay = async (num, type) => {
  const res = await createOrderBase({ type });
  location.href = res.data;
};
const submit = async () => {
  if (document.visibilityState === "visible" && show.value) {
    free.loading = true;
    const res = await updateStepV2({
      stepId: free.stepId,
      applyId: free.applyId
    });
    setTimeout(() => {
      if (res.code === 0) {
        showNotify({
          type: "success",
          message: `恭喜！写入${ res.data }步成功`
        });
        free.currentRate = 100;
        setTimeout(() => {
          free.currentRate = 0;
          free.loading = false;
          store.toTab("/user");
        }, 1200);
      }
    }, 3000);
  }
};
// const newpay = reactive({
//   show: false,
//   active: {}
//   // handle: idx => {
//   //   newpay.active = idx
//   // }
// })
onMounted(() => {
  window.addEventListener("visibilitychange", submit);
});
onBeforeUnmount(() => {
  window.removeEventListener("visibilitychange", submit);
});
</script>
<style lang="less" scoped>
.block-btn {
  --van-button-radius: 0;
}
</style>
