<template>
  <!-- <div class="w-full h-screen"> -->
  <div class="flex bg-[#ffffff] w-full h-[90px] justify-between items-center shadow-md">
    <div class="flex justify-center items-center">
      <router-link to="/">
        <img
          class="w-[130px] md:w-[80px] lg:w-[120px] ml-2 md:ml-3 lg:ml-5"
          src="/assets/logo/new.png"
          alt="logo"
        />
      </router-link>
      <!-- <button @click="toggleShow" class="h-[20px] ml-[90px]  "  
    >
        <Icon
          class="icon-[material-symbols--menu] text-gray-500 transition-all delay-300"
          style="width: 30px; height: 30px"
          v-if="show"
          name="mingcute:left-fill"
        />
        <Icon
          class="icon-[material-symbols--menu] text-gray-500 transition-all delay-300"
          style="width: 30px; height: 30px"
          v-else
          name="material-symbols:menu"
        />
      </button> -->
    </div>
    <!-- แบบเก่า -->
    <!-- <div class="flex justify-between items-center gap-1 m-1 md:gap-2 md:m-1 lg:gap-5 lg:m-2">
      <nuxt-link to="/regesterhome" class="flex bg-[#e2e8f0] items-center rounded-full p-2 hover:bg-gray-100">
        <Icon name="lucide:house-plus" class="text-gray-500 w-[30px] h-[20px]" />
        <span class="hidden md:hidden lg:block text-gray-600">ลงประกาศบ้านพัก</span>
      </nuxt-link>
      <nuxt-link to="/login" @click="onLogout"
        class="flex bg-[#e2e8f0] items-center rounded-full p-2 hover:bg-gray-100">
        <Icon name="lucide:log-out" class="text-gray-500 w-[30px] h-[20px]" />
        <span class="hidden md:hidden lg:block text-gray-600">ออกจากระบบ</span>
      </nuxt-link>
    </div> -->
    <div class="flex justify-between items-center gap-2 m-2 md:gap-4 lg:gap-6">
      <nuxt-link
        to="/regesterhome"
        class="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 font-medium rounded-full px-4 py-2 shadow-md hover:from-blue-200 hover:to-blue-300 hover:text-blue-900 transition-all duration-400"
      >
        <Icon
          name="lucide:house-plus"
          class="w-[24px] h-[24px] text-blue-600"
        />
        <span class="hidden lg:block">ลงประกาศบ้านพัก</span>
      </nuxt-link>
      <nuxt-link
        to="/login"
        @click="onLogout"
        class="flex items-center gap-2 bg-gradient-to-r from-red-100 to-red-200 text-red-700 font-medium rounded-full px-4 py-2 shadow-md hover:from-red-200 hover:to-red-300 hover:text-red-900 transition-all duration-400"
      >
        <Icon name="lucide:log-out" class="w-[24px] h-[24px] text-red-600" />
        <span class="hidden lg:block">ออกจากระบบ</span>
      </nuxt-link>
    </div>

  </div>
  <!-- </div> -->
</template>

<script lang="ts" setup>
const emit = defineEmits(["updateShow"]);
const show = ref<boolean>(true);

watch(show, (newValue) => {
  emit("updateShow", newValue);
});
const toggleShow = () => {
  show.value = !show.value;
  emit("updateShow", show.value);
};

const router = useRouter();
const onLogout = () => {
  removeCookie("token");
  removeCookie("title_page");
  removeCookie("username");
  location.reload();
};
</script>
