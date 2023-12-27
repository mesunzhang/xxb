import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { getUserInfo } from "@/request/main.services";

interface State {
  info: UserInfo;
}

interface UserInfo {
  vipFreeEndDay: string;
}

export const useUserStore: State = defineStore("user", () => {
  const info: Ref<UserInfo> = ref();

  async function initUserInfo() {
    //用户信息
    const { data } = await getUserInfo();
    if (data) {
      info.value = data;
    }
  }

  return { info, initUserInfo };
});
