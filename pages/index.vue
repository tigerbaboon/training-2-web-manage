<template>
  <div class="bg-[#d1d5db] w-full h-screen hidden md:block">
    <div class="flex justify-center text-[50px] text-gray-600">
      ยินดีต้อนรับแอดทุกท่าน
    </div>
    <div class="flex justify-center mt-5 ]"> 
      <div class="w-[500px] h-[500px]">
        <PieChart class="w-[500px] h-[500px]" />
      </div>
    </div>
    
  </div>
  
  <div class="flex flex-col items-center text-gray-600 p-6 md:hidden bg-gray-50 rounded-lg shadow-lg w-full h-screen min-h-screen">
    <div class="flex justify-center mt-4">
      <img class="w-[200px] h-auto md:w-48" src="/assets/logo/new.png" alt="รูปหน้าหลัก" />
    </div>
    <div class="text-center">
      <h1 class="text-xl font-semibold mb-4">ยินดีต้อนรับเข้าสู่ระบบเว็บแอดมิน</h1>
    </div>
    <div class="flex justify-center mt-2">
      <img class="w-full h-auto" src="/assets/web/RM_8-skills-for-admin-page.jpg.webp" alt="รูปหน้าหลัก">
      <!-- <PieChart/> -->
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import PieChart from "@/components/PieChart.vue";
const titlePage = useCookie("title_page");

definePageMeta({
  middleware: "auth",
  layout: "default",
});

onMounted(() => {
  titlePage.value = JSON.stringify([
    {
      name: "หน้าแรก",
      to: "/",
      disabled: true,
    },
  ]);
});
</script>