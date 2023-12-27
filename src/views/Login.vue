<template>
  <van-form @submit="onSubmit" class="h-fit pt-28">
    <h1 class="mb-14 text-center text-xl font-bold text-slate-900">用户登录</h1>
    <van-cell-group inset class="bg-transparent p-4">
      <van-field
        v-model="form.name"
        :rules="[{ required: true, message: '请填写用户名' }]"
        label="用户名"
        name="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="form.pwd"
        :rules="[{ required: true, message: '请填写密码' }]"
        label="密码"
        name="密码"
        placeholder="密码"
        :type="showPwdFlag?'':'password'"
        :right-icon="showPwdFlag?'eye-o':'closed-eye'"
        @click-right-icon="showPwd"
        class="cursor-pointer"
      />
    </van-cell-group>
    <div class="m-auto mt-8 w-60 text-center">
      <van-button round native-type="submit" type="primary" :loading="loading" loading-text="提交" class="w-full">
        提交
      </van-button>
      <div class="mt-4 text-sm underline underline-offset-2	text-purple-600">免费注册</div>
    </div>
  </van-form>

</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../request/main.services";

const router = useRouter();
const showPwdFlag = ref(false);
const loading = ref(false);
const form = reactive({
  name: "",
  pwd: ""
});

async function onSubmit() {
  await login(form);
  router.push("/");
};

function showPwd() {
  showPwdFlag.value = !showPwdFlag.value;
}

</script>
<style lang="less" scoped>
.van-cell-group--inset {
  border-radius: 16px 16px 0 0;
  background: linear-gradient(to bottom, #fad7fa, #fbf9ff);
}
.van-cell {
  background: transparent;
  &:after {
    border-color: #9c53e1;
  }
  &:last-of-type {
    &:after {
      border-bottom: 0;
    }
  }
}

</style>
