<template>
  <div class="md:bg-gray-100 flex w-full md:h-screen items-center justify-center">
    <div class="md:w-[1340px] h-full md:h-[750px]">
      <div
        class="h-screen md:h-[750px] md:bg-[url('/assets/login/IMG_3037.JPEG')] bg-cover flex items-center justify-center rounded-lg shadow-2xl"
      >
        <div
          class="bg-white  md:w-[600px]  md:h-[600px] flex flex-col items-center justify-between rounded-lg md:shadow-lg p-8"
        >
          <div class="flex flex-col items-center ">
            <div class="md:w-[200px]">
              <img
                class="w-full h-full"
                src="/assets/logo/new.png"
                alt="Admin Logo"
              />
            </div>
            <h2 class="text-[28px] text-gray-800 font-semibold m-4">

              เข้าสู่ระบบ Admin
            </h2>
          </div>
          <form class="w-full md:px-8 space-y-6" @submit.prevent="onSubmit()">
            <div>
              <label class="block text-gray-700 text-[18px] mb-2"
                >ชื่อผู้ใช้</label
              >
              <input
                class="w-full h-[45px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition duration-200"
                type="text"
                v-model="input_username"
                placeholder="ป้อนชื่อผู้ใช้ของคุณ"
              />
            </div>
            <div>
              <label class="block text-gray-700 text-[18px] mb-2"
                >รหัสผ่าน</label
              >
              <input
                class="w-full h-[45px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition duration-200"
                type="password"
                v-model="input_password"
                placeholder="ป้อนรหัสผ่านของคุณ"
              />
            </div>
            <div class="text-right">
              <button
                type="button"
                class="text-[#00AEEF] text-[16px] hover:underline"
              >
                ลืมรหัสผ่าน?
              </button>
            </div>
            <div class="flex justify-center mt-6">
              <button
                type="submit"
                class="bg-[#00AEEF] w-full py-3 text-white text-[18px] font-medium rounded-lg hover:bg-[#00c3ff] transition duration-200"
                :disabled="loading"
              >
                ยืนยัน
              </button>
            </div>
          </form>
          <div class="text-center text-gray-500 text-[14px]">
            © 2024 ระบบจัดการ Admin | สงวนลิขสิทธิ์
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import service from "~/service";
import Swal from "sweetalert2";

definePageMeta({
  layout: "loginlayout",
  middleware: "login",
});

const router = useRouter();

const loading = ref<boolean>(false);
const input_username = ref<string>("");
const input_password = ref<string>("");

const onSubmit = async () => {
  try {
    const resp: any = await service.auth.login({
      username: input_username.value,
      password: input_password.value,
    });

    if (resp.Code == "200") {
      const refToken = setCookie("token");
      refToken.value = resp?.Data?.token || "";
      const refUsername = setCookie("username");
      refUsername.value = input_username.value || "";
      router.push("/");
    } else {
      throw new Error("เกิดข้อผิดพลาด");
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "เกิดข้อผิดพลาด",
    });
  }
};
</script>
