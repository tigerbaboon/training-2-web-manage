<template>
  <div class="flex justify-center items-center h-screen w-full relative">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
      v-if="props.addshow"
    >
      <div
        class="bg-white shadow-xl rounded-lg p-6 w-[90%] max-w-[400px] md:max-w-[920px] h-[800px] overflow-auto relative"
      >
        <div class="w-full">
          <div class="w-full">
            <h1 class="md:text-[25px] font-semibold text-center mb-4">
              เพิ่มสถานที่ท่องเที่ยว
            </h1>
            <div class="flex flex-col items-center">
              <input
                class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full md:w-[700px] text-center text-gray-700"
                placeholder="ชื่อสถานที่ท่องเที่ยว"
                v-model="travel_title"
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
                    @change="handleSingleImageUpload2"
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
              <div
                v-if="uploadedImages.length || uploadedImages2.length"
                class="w-full md:w-[700px] mb-2 gap-1"
              >
                <div class="border rounded-md p-3">
                  <div class="md:flex grid grid-cols-1 gap-2">
                    <div
                      v-if="uploadedImages.length"
                      class="w-full md:w-[460px] h-[160px] md:h-[240px] relative"
                    >
                      <button
                        @click="delimg()"
                        class="absolute top-2 right-3 text-rose-600 hover:text-red-500"
                      >
                        <Icon
                          class="w-[30px] h-[30px]"
                          name="mdi:close-thick"
                        />
                      </button>
                      <img
                        class="w-full h-full rounded-md object-cover"
                        :src="uploadedImages[0]"
                        alt="Uploaded"
                      />
                      <span
                        class="absolute top-2 left-2 text-white bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-1.5 rounded-[4px] shadow-md text-sm font-semibold"
                      >
                        รูปหน้าปก
                      </span>
                    </div>
                    <div
                      class="grid grid-cols-1 gap-2 overflow-y-auto overflow-x-hidden h-[328px] md:h-[240px]"
                    >
                      <div
                        v-if="uploadedImages2.length"
                        v-for="(
                          uploadedImages2, index
                        ) in uploadedImages2.slice(0)"
                        :key="index"
                        class="w-full md:w-[190px] h-[160px] md:h-[115px] relative"
                      >
                        <button
                          @click="delimg2(index)"
                          class="absolute top-1 right-2 text-rose-600 hover:text-red-500"
                        >
                          <Icon
                            class="w-[20px] h-[20px]"
                            name="mdi:close-thick"
                          />
                        </button>
                        <img
                          class="w-full h-full rounded-md object-cover"
                          :src="uploadedImages2"
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
              </div>
              <div
                v-if="!uploadedImages.length"
                class="w-full md:w-[700px] h-[300px] md:h-[260px] mb-2 gap-1 flex justify-center items-center border rounded-md p-3"
              >
                <span>กรุณาอัพโหลดรูปภาพ</span>
              </div>
              <textarea
                placeholder="ข้อมูลสถานที่ท่องเที่ยว"
                v-model="travel_detail"
                class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full md:w-[700px] text-center text-gray-700"
                id="Product_details"
              >
              </textarea>
              <pre></pre>
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
            <div class="w-full flex justify-end gap-4 mt-2">
              <button
                class="w-[75px] bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                @click="onSubmit"
              >
                ตกลง
              </button>
              <button
                class="w-[75px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                @click="close"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import service from "~/service";
import Swal from "sweetalert2";
import MarkMapApi from "@/components/MarkMapApi.vue";
import { usePositionStore } from "@/store/position";
const positionStore = usePositionStore();

const emit = defineEmits(["close", "updateadd"]);

const close = () => {
  emit("close");
};

const isLoading = ref(false);
const travel_title = ref<string>("");
const travel_detail = ref<string>("");
const rawFiles = ref<any>([]);
const rawFiles2 = ref<any>([]);
const lat = ref<number | null>(null);
const lng = ref<number | null>(null);

const props = defineProps<{
  addshow: Boolean;
  datas: {
    lat: number;
    long: number;
  };
}>();

function updateLatLng(coords: { lat: number; lng: number }) {
  lat.value = coords.lat;
  lng.value = coords.lng;
  positionStore.setLatLng(coords.lat, coords.lng);
}

const onSubmit = async () => {


  if (positionStore.lat === null || positionStore.lng === null) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "กรุณาเลือกตำแหน่งบนแผนที่",
    });
    return;
  }

  isLoading.value = true;
  try {
    const formdata: any = new FormData();
    formdata.append("travel_title", travel_title.value);
    formdata.append("travel_detail", travel_detail.value);

    for (let i = 0; i < rawFiles.value.length; i++) {
      const file = rawFiles.value[i];
      formdata.append("image_main", file, file.name);
      console.log("image_main", file, file.name);
    }

    for (let i = 0; i < rawFiles2.value.length; i++) {
      const files = rawFiles2.value[i];
      formdata.append("image", files, files.name);
      console.log("image-long", files, files.name);
    }
    console.log("lat:", positionStore.lat, "lng:", positionStore.lng);
    formdata.append("location_latitute", positionStore.lat);
    formdata.append("location_longitute", positionStore.lng);

    const resp: any = await service.tavel.createtavel(formdata);
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
      text: error.message || "เกิดข้อผิดพลาด",
    });
  } finally {
    isLoading.value = false;
  }
};

const uploadedImages = ref<string[]>([]);
const handleSingleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    rawFiles.value = files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        uploadedImages.value.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
};

const uploadedImages2 = ref<string[]>([]);
const handleSingleImageUpload2 = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    rawFiles2.value = files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        uploadedImages2.value.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
};

const delimg = () => {
  uploadedImages.value = []; // ล้างข้อมูลรูปภาพทั้งหมด
};

const delimg2 = (index: number) => {
  uploadedImages2.value.splice(index, 1);
  // uploadedImages2.value = []; // ล้างข้อมูลรูปภาพทั้งหมด
};
</script>

<style scoped>
.test {
  @apply border-solid shadow-md border-[1px] border-gray-400 rounded-lg p-2;
}
</style>
