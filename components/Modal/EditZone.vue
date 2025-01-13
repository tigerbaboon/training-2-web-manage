<template>
  <div class="flex justify-center items-center h-screen w-full relative">
    <!-- <div class="h-screen absolute top-0 right-[1380px] flex justify-center items-center overflow-auto" v-if="props.show"> -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      v-if="props.show"
    >
      <div
        class="bg-white shadow-xl rounded-lg p-6 w-[90%] max-w-[400px] md:max-w-[920px] h-auto overflow-auto relative"
      >
        <div class="h-[800px] overflow-auto">
          <h1 class="md:text-[25px] font-semibold text-center mb-4">
            แก้ไขโซน
          </h1>
          <div class="flex flex-col items-center">
            <input
              class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full md:w-[500px] text-center text-gray-700"
              v-model="props.datas.zone_name"
            />
            <input
              type="file"
              class="flex justify-center shadow-md border-solid border-[1px] border-black rounded-lg p-2 w-[200px] mt-5 text-center"
              @change="handleSingleImageUpload"
            />
            <div v-if="newImages || props.datas.images.url" class="gap-1 mt-2">
              <!-- รูปเก่า -->
              <div class="relative">
                <img
                  class="w-[200px] md:w-[350px] h-[130px] md:h-[220px] my-8"
                  :src="
                    newImages.length ? newImages[0] : props.datas.images.url
                  "
                  alt="Uploaded"
                />
              </div>
            </div>
            <div class="w-full md:w-[700px] my-2">
              <MarkMapApi
                class="h-[400px]"
                :datas="{
                  location_latitute: props.datas.lat,
                  location_longitute: props.datas.long,
                }"
                @update:latLng="updateLatLng"
              />
            </div>
          </div>
          <div class="w-full flex justify-end gap-4 mt-8">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              @click="updatezone(props.datas.id)"
            >
              ตกลง
            </button>
            <button
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              @click="hide"
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

const props = defineProps({
  show: Boolean,
  datas: {
    type: Object,
    default: () => null,
  },
});

const emit = defineEmits(["close", "updateEdit"]);
const hide = () => {
  emit("close");
};

const newImages = ref<string[]>([]);
const lat = ref<number>(0);
const lng = ref<number>(0);

const updateLatLng = async (coords: { lat: number; lng: number }) => {
  lat.value = coords.lat;
  lng.value = coords.lng;
  positionStore.setLatLng(coords.lat, coords.lng);
  console.log("122244", lat.value, lng.value);
};
console.log("id", props.datas.images);

const updatezone = async (id: string) => {
  try {
    if (!id) {
      throw new Error("ต้องระบุ ID");
    }
    let remainingImageIDs: string = "";
    if (props.datas.images.id) {
      remainingImageIDs = props.datas.images.id;
    }

    const formdata: any = new FormData();
    formdata.append("id", id);
    formdata.append("zone_name", props.datas.zone_name);
    formdata.append("lat", positionStore.lat.toString());
    formdata.append("long", positionStore.lng.toString());
    if (rawFileMain.value) {
      formdata.append("images", rawFileMain.value, rawFileMain.value.name);
      console.log("rawFileMain", rawFileMain.value);
      
    }
    formdata.append("remainingImageIDs", remainingImageIDs);

    const resp: any = await service.zone.EditByZone(formdata, id);
    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
      });
      emit("updateEdit");
    } else {
      throw new Error("ไม่สามารถแก้ไขข้อมูลได้");
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: error.message || "เกิดข้อผิดพลาด",
    });
  }
};

const rawFileMain = ref<File>();

const handleSingleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      newImages.value = [reader.result as string];
    };
    reader.readAsDataURL(file);
    rawFileMain.value = file;
    props.datas.image = [];
  }
};

const deleteImage = (index: number) => {
  props.datas.images.splice(index, 1);
};
</script>

<style scoped></style>
