<template>
  <div class="flex justify-center items-center h-screen w-full relative">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
      v-if="props.addshow"
    >
      <div
        class="bg-white shadow-xl rounded-lg p-6 w-[90%] max-w-[400px] md:max-w-[920px] h-auto overflow-auto relative"
      >
        <div class="flex flex-col items-center">
          <h1 class="md:text-[25px] font-semibold text-center mb-4">
            เพิ่มโซน
          </h1>
          <input
            class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full md:w-[500px] text-center text-gray-700"
            placeholder="กรอกโซนที่ต้องการเพิ่ม"
            v-model="zone_name"
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
                class="w-[349px] md:w-[450px] h-[240px] md:h-[240px] rounded-xl"
                :src="image"
                alt="Uploaded"
              />
            </div>
          </div>
          <pre>
            1. ลากหมุดไปยังตำแหน่งที่ต้องการ
            {{ lat }} {{ lng }}
          </pre>
          <MarkMapApi
            class="h-[400px] w-[700px]"
            @update:latLng="updateLatLng"
          />
          <!-- <div class="w-full md:w-[500px] space-y-2">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="text-gray-700 font-medium">ละติจูด</label>
                <input type="number" v-model="lat" placeholder="0.0"
                  class="border border-gray-300 focus:border-blue-500 outline-none rounded-lg shadow-sm p-2 w-full text-gray-700" />
              </div>
              <div>
                <label class="text-gray-700 font-medium">ลองติจูด</label>
                <input type="number" v-model="long" placeholder="0.0"
                  class="border border-gray-300 focus:border-blue-500 outline-none rounded-lg shadow-sm p-2 w-full text-gray-700" />
              </div>
            </div>
          </div> -->
          <div class="w-full flex justify-end gap-4 mt-8">
            <button
              class="w-[75px] bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              @click="onSubmit"
            >
              ตกลง
            </button>
            <button
              class="w-[75px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              @click="AddModal"
            >
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
import { usePositionStore } from "@/store/position";
const positionStore = usePositionStore();


const rawFileshome = ref<any>([]);
const zone_name = ref<string>("");
const isLoading = ref<boolean>(false);
const image = ref<string[]>([]);
const lat = ref<number | null>(null);
const lng = ref<number | null>(null);

const emit = defineEmits(["close", "updateadd"]);
const AddModal = () => {
  emit("close");
};

const props = defineProps<{
  addshow: Boolean;
}>();

function updateLatLng(coords: { lat: number; lng: number }) {
  lat.value = coords.lat;
  lng.value = coords.lng;
  positionStore.setLatLng(coords.lat, coords.lng);
  console.log("updateLatLng :", lat.value, lng.value);
}

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const formdata: any = new FormData();
    formdata.append("zone_name", zone_name.value);
    formdata.append("lat", positionStore.lat);
    formdata.append("long", positionStore.lng);
    console.log("lat:", lat.value , "lng:", lng.value);
    for (let i = 0; i < rawFileshome.value.length; i++) {
      const rawFilehome = rawFileshome.value[i];
      formdata.append("image", rawFilehome, rawFilehome.name);
    }
    const resp: any = await service.zone.createzone(formdata);
    console.log(resp);
    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "ลงทะเบียนเรียบร้อย",
      });
      emit("updateadd");
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
</script>

<style scoped></style>
