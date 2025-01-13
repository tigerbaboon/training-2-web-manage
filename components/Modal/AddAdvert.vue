<template>
  <div class="flex justify-center items-center h-screen w-full relative">
    <!-- <div
      class="h-screen absolute top-0 right-[1380px] flex justify-center items-center overflow-auto"
      v-if="props.addshow"
    > -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
      v-if="props.addshow"
    >
      <div class="bg-white shadow-xl rounded-lg p-6 w-[90%] max-w-[400px] md:max-w-[920px] h-auto  overflow-auto relative">
        <div>
          <h1 class="md:text-[25px] font-semibold text-center mb-4">เพิ่มโฆษณา</h1>

          <div class="flex flex-col items-center">
            <input
              class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full md:w-[500px] text-center text-gray-700"
              placeholder="กรอกชื่อโฆษณา"
              v-model="promote_name"
            />
            <input
              class="text-sm cursor-pointer p-3"
              type="file"
              multiple
              @change="handleSingleImageUpload"
            />
            <div v-if="image.length" class="gap-1 overflow-auto">
              <div
                v-for="(image, index) in image.slice(0)"
                :key="index"
                class="relative"
              >
                <button
                  @click="delimg2(index)"
                  class="absolute top-1 right-2 text-rose-600 hover:text-red-500"
                >
                  <Icon class="w-[20px] h-[20px]" name="mdi:close-thick" />
                </button>
                <img
                  class="w-[500px] h-auto rounded-xl my-5"
                  :src="image"
                  alt="Uploaded"
                />
              </div>
            </div>
            <input
              placeholder="ลิ้งค์ URL"
              class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full md:w-[500px] text-center text-gray-700"
              v-model="link"
            />
            <div class="flex justify-center w-full">
              <select
                class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 mt-5 w-full md:w-[500px] text-center text-gray-700"
                id="id-price"
                v-model="promote_type"
              >
                <option
                  v-for="(value, x) in positions"
                  key="x"
                >
                  {{ value.position }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-full flex justify-end gap-4 mt-8">
            <button
              class="w-[75px] bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              @click="onSubmit">
              ตกลง
            </button>
            <button
              class="w-[75px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              @click="AddModal">
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import service from "~/service";



const isLoading = ref(false);
const promote_name = ref<string>("");
const link = ref<string>("");
const image = ref<string[]>([]);
const rawFileshome = ref<any>([]);

interface Position {
  position: string;
}


const props = defineProps<{
  addshow: Boolean;
}>();

const emit = defineEmits(["close", "updateAdd"]);
const AddModal = () => {
  emit("close");
};



const positions = ref<Position[]>([
  {
    position: "เลือกทั้งหมด",
  },
  {
    position: "หน้าหลัก",
  },
  {
    position: "ส่วนย่อย",
  },
]);

const promote_type = ref<any>(positions.value[0].position);

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const formdata: any = new FormData();
    formdata.append("promote_name", promote_name.value);
    formdata.append("promote_type", promote_type.value);
    formdata.append("link", link.value);
    for (let i = 0; i < rawFileshome.value.length; i++) {
      const rawFilehome = rawFileshome.value[i];
      formdata.append("image", rawFilehome, rawFilehome.name);
    }
    const resp: any = await service.promote.createpromote(formdata);
    console.log(resp);
    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "ลงทะเบียนเรียบร้อย",
      });
      emit("updateAdd");
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: error || "เกิดข้อผิดพลาด",
    });
  } finally {
    isLoading.value = false;
  }
};

const handleSingleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const file = files[0];
    rawFileshome.value = [file];
    const reader = new FileReader();
    reader.onload = () => {
      image.value = [reader.result as string];
    };
    reader.readAsDataURL(file);
  }
};

const delimg2 = (index: number) => {
  image.value.splice(index, 1);
  // uploadedImages2.value = []; // ล้างข้อมูลรูปภาพทั้งหมด
};

// const handleMultipleImageUpload2 = (event: Event) => {
//   const files = (event.target as HTMLInputElement).files;
//   if (files) {
//     rawFileshome.value = files;
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const reader = new FileReader();
//       reader.onload = () => {
//         image.value.push(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   }
// };
</script>

<style scoped></style>
