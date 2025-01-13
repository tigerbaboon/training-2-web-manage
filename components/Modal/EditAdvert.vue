<template>
  <div class="flex justify-center items-center h-screen w-full relative">
    <!-- <div class="h-screen absolute top-0 right-[1380px] flex justify-center items-center overflow-auto" v-if="props.show"> -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
      v-if="props.show"
    >
      <div
        class="bg-white shadow-xl rounded-lg p-6 w-[90%] max-w-[400px] md:max-w-[920px] h-auto overflow-auto relative"
      >
        <div>
          <h1 class="md:text-[25px] font-semibold text-center mb-4">
            แก้ไขโฆษณา
          </h1>
          <div class="flex flex-col items-center">
            <input
              class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full md:w-[500px] text-center text-gray-700"
              v-model="props.datas.promote_name"
            />
            <input
              type="file"
              class="flex justify-center shadow-md border-solid border-[1px] border-black rounded-lg p-2 w-[200px] mt-5 text-center"
              @change="handleImageUpload"
            />
            <div
              v-if="props.datas.image.url || newImage"
              class="gap-1 mt-2"
              :class="{
                'h-[150px] overflow-y-auto': props.datas.image.url || newImage,
              }"
            >
              <!-- รูปเก่า -->
              <div v-if="!newImage" class="relative">
                <button
                  @click="deleteImage(props.datas.image.url, 0)"
                  class="absolute top-1 right-2 text-rose-600 hover:text-red-500"
                >
                  <Icon
                    class="w-[20px] h-[20px] object-cover"
                    name="mdi:close-thick"
                  />
                </button>
                <img
                  class="w-[500px] h-auto rounded-xl my-5"
                  :src="props.datas.image.url"
                  alt="Uploaded"
                />
              </div>

              <!-- รูปใหม่ -->
              <div v-if="newImage" class="relative">
                <button
                  @click="deleteNewImage"
                  class="absolute top-1 right-2 text-rose-600 hover:text-red-500"
                >
                  <Icon
                    class="w-[20px] h-[20px] object-cover"
                    name="mdi:close-thick"
                  />
                </button>
                <img
                  class="w-[500px] h-auto rounded-xl"
                  :src="newImage"
                  alt="Uploaded"
                />
              </div>
            </div>
            <input
              placeholder="ลิ้งค์ URL"
              class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full md:w-[500px] text-center text-gray-700"
              v-model="props.datas.link"
            />
            <div class="flex justify-center w-full">
              <select
                class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 mt-5 w-full md:w-[500px] text-center text-gray-700"
                id="id-price"
                v-model="promote_type"
              >
                <option>{{ props.datas.promote_type }}</option>
                <option
                  v-for="(value, x) in positions.filter((e: any) => e.position != props.datas.promote_type)"
                  key="x"
                >
                  {{ value.position }}
                </option>
              </select>
            </div>
          </div>
          <!-- <pre> {{  props.datas.promote_type  }}  </pre> -->
          <div class="w-full flex justify-end gap-4 mt-8">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              @click="updatepromote(props.datas.id)"
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

const promote_type = ref<string>(props.datas.promote_type || "");
const newImage = ref<string | null>(null);


const updatepromote = async (id: string) => {
  try {
    if (!id) {
      throw new Error("ID is required");
    }

    let remainingImageID: string = "";
    if (props.datas.image.id) {
      remainingImageID = props.datas.image.id;
    }

    const formdata: any = new FormData();
    formdata.append("id", id);
    formdata.append("promote_name", props.datas.promote_name);
    formdata.append("promote_type", promote_type.value);
    formdata.append("link", props.datas.link);
    if (newImage.value) {
      const blob = await fetch(newImage.value).then((res) => res.blob());
      formdata.append("image", blob, "newImage.png");
    } else {
      formdata.append("image", props.datas.image.url);
    }

    formdata.append("remainingImageID", remainingImageID);

    const resp: any = await service.promote.EditByPromote(formdata, id);
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


const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        newImage.value = e.target.result as string; // Replace old image with new image
      }
    };
    reader.readAsDataURL(files[0]);
  }
};

interface Position {
  position: string;
}

const positions = ref<Position[]>([
  {
    position: "หน้าหลัก",
  },
  {
    position: "ส่วนย่อย",
  },
]);
onMounted(() => {
  const position = positions.value.find(
    (p) => p.position === props.datas.position
  );
  if (position) {
    position.position = props.datas.position;
  }
});

const deleteNewImage = () => {
  newImage.value = null;
};

const deleteImage = (payload: any, index: number) => {
  payload.splice(index, 1);
};
</script>

<style scoped></style>
