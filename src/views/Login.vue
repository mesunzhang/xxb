<template>
  <van-form @submit="onSubmit" class="mt-14 h-fit">
    <h1 class="mb-14 text-center text-xl font-bold text-slate-900">用户登录</h1>
    <van-cell-group inset>
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
    <div class="m-auto mt-8 w-60">
      <van-button block native-type="submit" type="success">
        提交
      </van-button>
    </div>
  </van-form>

</template>
<script setup>
import { reactive, ref } from "vue";
import { login } from "../request/login.services";

const showPwdFlag = ref(false);
const form = reactive({
  name: "",
  pwd: ""
});
const onSubmit = (values) => {
  login(form);
};

function showPwd() {
  showPwdFlag.value = !showPwdFlag.value;
}

</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
