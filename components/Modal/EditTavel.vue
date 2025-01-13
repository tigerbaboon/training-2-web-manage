<template>
  <div class="flex justify-center items-center h-screen w-full relative">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
      v-if="props.show"
    >
      <div
        class="bg-white shadow-xl rounded-lg p-6 w-[90%] max-w-[400px] md:max-w-[920px] h-[830px] overflow-auto relative"
      >
        <div class="w-full">
          <h1 class="md:text-[25px] font-semibold text-center mb-4">
            แก้ไขสถานที่ท่องเที่ยว
          </h1>
          <div class="flex flex-col items-center">
            <!-- <label class="mt-2 text-gray-500">ชื่อสถานที่ท่องเที่ยว</label> -->
            <input
              class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full md:w-[700px] text-center text-gray-700"
              v-model="props.datas.travel_title"
            />
            <div class="flex items-center gap-2 my-2 w-full md:w-[700px]">
              <label
                class="w-full md:w-[700px] cursor-pointer relative group border-2 border-dashed border-gray-700 rounded-lg p-2 flex items-center justify-center gap-2 hover:border-sky-400 transition-all"
              >
                <input
                  class="text-sm cursor-pointer hidden"
                  type="file"
                  multiple
                  @change="handleSingleImageUpload"
                />
                <Icon
                  class="w-[30px] md:w-[50px] h-[30px] md:h-[50px] text-sky-400 group-hover:text-sky-400 transition-all"
                  name="fluent:image-add-32-light"
                />
                <div>
                  <p class="text-gray-500 text-[14px] md:text-[16px]">
                    เพิ่มรูปหน้าปก
                  </p>
                  <p class="text-xs text-gray-600 hidden md:block">
                    (ไฟล์ jpg, png)
                  </p>
                </div>
              </label>
              <label
                class="w-full md:w-[700px] cursor-pointer relative group border-2 border-dashed border-gray-700 rounded-lg p-2 flex items-center justify-center gap-2 hover:border-green-400 transition-all"
              >
                <input
                  class="text-sm cursor-pointer hidden"
                  type="file"
                  multiple
                  @change="handleMultipleImageUpload3"
                />
                <Icon
                  class="w-[30px] md:w-[50px] h-[30px] md:h-[50px] text-green-400 group-hover:text-green-400 transition-all"
                  name="fluent:image-add-32-light"
                />
                <div>
                  <p class="text-gray-500 text-[14px] md:text-[16px]">
                    เพิ่มรูปประกอบ
                  </p>
                  <p class="text-xs text-gray-600 hidden md:block">
                    (ไฟล์ jpg, png)
                  </p>
                </div>
              </label>
            </div>
            <div class="border rounded-md p-3 mb-3 w-full md:w-[700px]">
              <div class="md:flex grid grid-cols-1 gap-2">
                <div
                  v-if="props.datas.image_main || newImageMain"
                  class="w-full md:w-[460px] h-[160px] md:h-[240px] relative"
                >
                  <!-- ลบรูปและแก้ไขรููปหน้าปกไม่ได้ -->
                  <!-- <button @click="deleteImage2(props.datas.image_main, 0)"
                    class="absolute top-1 right-2 text-rose-600 hover:text-red-500">
                    <Icon class="w-[20px] h-[20px] object-cover" name="mdi:close-thick" />
                  </button> -->
                  <img
                    class="w-full h-full rounded-md object-cover"
                    :src="newImageMain || props.datas.image_main.url"
                    alt="Uploaded"
                  />
                  <span
                    class="absolute top-2 left-2 text-white bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-1.5 rounded-[4px] shadow-md text-sm font-semibold"
                  >
                    รูปหน้าปก
                  </span>
                </div>
                <div
                  v-if="props.datas.images"
                  class="grid grid-cols-1 gap-2 overflow-y-auto overflow-x-hidden h-[328px] md:h-[240px]"
                  :class="{
                    'h-[328px] md:h-[240px] overflow-y-auto':
                      props.datas.images.length + newImages.length > 2,
                  }"
                >
                  <!-- รูปใหม่ -->
                  <div
                    v-for="(newImage, index) in newImages"
                    :key="index"
                    class="w-full md:w-[190px] h-[160px] md:h-[115px] relative"
                  >
                    <button
                      @click="deleteImage(newImages, index)"
                      class="absolute top-1 right-2 text-rose-600 hover:text-red-500"
                    >
                      <Icon
                        class="w-[20px] h-[20px] object-cover"
                        name="mdi:close-thick"
                      />
                    </button>
                    <img
                      class="w-full h-full rounded-md object-cover"
                      :src="newImage"
                      alt="Uploaded"
                    />
                    <span
                      class="absolute top-1 left-1 text-[12px] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-2 py-1 rounded-[4px] shadow-md font-semibold"
                    >
                      รูปประกอบ
                    </span>
                  </div>
                  <!-- รูปเก่า -->
                  <div
                    v-for="(image, index) in props.datas.images"
                    :key="index"
                    class="w-full md:w-[190px] h-[160px] md:h-[115px] relative"
                  >
                    <button
                      @click="deleteImage(props.datas.images, index)"
                      class="absolute top-1 right-2 text-rose-600 hover:text-red-500"
                    >
                      <Icon
                        class="w-[20px] h-[20px] object-cover"
                        name="mdi:close-thick"
                      />
                    </button>
                    <img
                      class="w-full h-full rounded-md object-cover"
                      :src="image.url"
                      alt="Uploaded"
                    />
                    <span
                      class="absolute top-1 left-1 text-[12px] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-2 py-1 rounded-[4px] shadow-md font-semibold"
                    >
                      รูปประกอบ
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <textarea
              placeholder="ข้อมูลสถานที่ท่องเที่ยว"
              v-model="props.datas.travel_detail"
              class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg px-3 py-5 w-full md:w-[700px] h-[150px] text-gray-700"
              id="Product_details"
            ></textarea>
            <div class="w-full md:w-[700px] my-2">
              <MarkMapApi
                class="h-[400px]"
                :datas="{
                  location_latitute: props.datas.location_latitute,
                  location_longitute: props.datas.location_longitute,
                }"
                @update:latLng="updateLatLng"
              />
            </div>
            <!-- <div class="w-full md:w-[700px] my-2">
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="text-gray-700 font-medium">ละติจูด</label>
                  <input type="number" v-model="props.datas.location_latitute" placeholder="0.0"
                    class="border border-gray-300 focus:border-blue-500 outline-none rounded-lg shadow-sm p-2 w-full text-gray-700" />
                </div>
                <div>
                  <label class="text-gray-700 font-medium">ลองติจูด</label>
                  <input type="number" v-model="props.datas.location_longitute" placeholder="0.0"
                    class="border border-gray-300 focus:border-blue-500 outline-none rounded-lg shadow-sm p-2 w-full text-gray-700" />
                </div>
              </div>
            </div> -->
          </div>
          <div class="w-full md:w-[700px] flex justify-end gap-4 mt-2">
            <button
              class="w-[75px] bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              @click="updateByEdit(props.datas.id)"
            >
              ตกลง
            </button>
            <button
              class="w-[75px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
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
import service from "~/service";
import Swal from "sweetalert2";
import axios from "axios";
import MarkMapApi from "@/components/MarkMapApi.vue";

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
const rawFiles = ref<File[]>([]);
const newImageMain = ref<string | null>(null);
const rawFileMain = ref<File | null>(null);
const lat = ref<number>(0);
const lng = ref<number>(0);

const updateLatLng = async (coords: { lat: number; lng: number }) => {
  lat.value = coords.lat;
  lng.value = coords.lng;
  positionStore.setLatLng(coords.lat, coords.lng);
  console.log("122244", lat.value, lng.value);
};

const setPositions = async (coords: { lat: number; lng: number }) => {
  positionStore.setLatLng(coords.lat, coords.lng);
};

const updateByEdit = async (id: string) => {
  try {
    if (!id) {
      throw new Error("ID is required");
    }

    let remainingImageIDs: string = "";
    for (let i = 0; i < props.datas.images.length; i++) {
      const image = props.datas.images[i];
      console.log(image);

      remainingImageIDs += image.id;

      if (i < props.datas.images.length - 1) remainingImageIDs += ",";
    }

    let remainingImageMainID: string = "";
    if (props.datas.image_main) {
      remainingImageMainID = props.datas.image_main.id;
    }

    const formdata: any = new FormData();
    formdata.append("id", id);
    formdata.append("travel_title", props.datas.travel_title);
    formdata.append("travel_detail", props.datas.travel_detail);
    for (let i = 0; i < rawFiles.value.length; i++) {
      const rawFile = rawFiles.value[i];
      formdata.append("image", rawFile, rawFile.name);
    }

    if (rawFileMain.value) {
      formdata.append("image_main", rawFileMain.value, rawFileMain.value.name);
    }

    console.log("pppppp", positionStore.lat, positionStore.lng);

    formdata.append("location_latitute", positionStore.lat.toString());
    formdata.append("location_longitute", positionStore.lng.toString());
    formdata.append("remainingImageIDs", remainingImageIDs);
    formdata.append("remainingImageMainID", remainingImageMainID);

    const resp: any = await service.tavel.updateByEdit(formdata, id);
    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
      });
      emit("updateEdit");
    } else {
      throw new Error("Failed to update data");
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: error.message || "เกิดข้อผิดพลาด",
    });
  }
};

const backupImages = ref<any[]>([]);
onMounted(() => {
  backupImages.value = [...props.datas.images];

  setPositions({
    lat: props.datas.location_latitute,
    lng: props.datas.location_longitute,
  });
});

const handleMultipleImageUpload3 = async (event: Event) => {
  let files = (event.target as HTMLInputElement).files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        newImages.value.push(reader.result as string);
      };
      reader.readAsDataURL(file);
      rawFiles.value.push(file);
    }
  }
};

const handleSingleImageUpload = async (event: Event) => {
  let files2 = (event.target as HTMLInputElement).files;
  if (files2 && files2.length > 0) {
    const file2 = files2[0];
    const reader = new FileReader();
    reader.onload = () => {
      newImageMain.value = reader.result as string;
    };
    reader.readAsDataURL(file2);
    rawFileMain.value = file2;
  }
};

const deleteImage = (payload: any, index: number) => {
  payload.splice(index, 1);
};

const deleteImage2 = (payload: any, index: number) => {
  payload.splice(index, 1);
};
</script>

<style scoped></style>
