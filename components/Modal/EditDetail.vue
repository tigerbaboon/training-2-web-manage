<template>
  <div class="flex justify-center items-center h-screen w-full relative">
    <!-- <div class="h-screen absolute top-0 right-[1380px] flex justify-center items-center overflow-auto" v-if="props.show"> -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
      v-if="props.show"
    >
      <div
        class="bg-white shadow-xl rounded-lg p-6 w-[90%] max-w-[400px] md:max-w-[920px] h-auto md:h-auto overflow-auto relative"
      >
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">
          แก้ไขสิ่งอำนวยความสะดวก
        </h1>
        <div>
          <div class="flex flex-col items-center">
            <input
              type="text"
              class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-3 w-full text-center text-gray-700"
              v-model="props.datas.amenity_name"
              placeholder="กรอกชื่อสิ่งอำนวยความสะดวก"
            />
          </div>
          <div class="grid grid-cols-6 gap-2 mt-6">
            <div
              v-for="(item, index) in listicon"
              :key="index"
              class="flex justify-center items-center"
            >
              <button @click="toggleSelect(index)">
                <Icon
                  :name="item.icon"
                  class="w-10 h-10"
                  :class="{
                    'text-blue-500': selectedIcons.includes(index),
                    'text-gray-500': !selectedIcons.includes(index),
                  }"
                />
              </button>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-end gap-4 mt-8">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
            @click="onUpdate(props.datas.id)"
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

const selectedIcons = ref<number[]>([]);
const listicon = ref<any>([
  { icon: "material-symbols:chair" },
  { icon: "ic:sharp-table-bar" },
  { icon: "material-symbols:table-lamp" },
  { icon: "material-symbols:bed" },
  { icon: "maki:shoe" },
  { icon: "mdi:washing-machine" },
  { icon: "mdi:water-filter" },
  { icon: "fa6-solid:computer" },
  { icon: "fa6-solid:tv" },
  { icon: "mynaui:air-conditioner-solid" },
  { icon: "solar:bath-bold-duotone" },
  { icon: "icon-park-solid:microwave-oven" },
  { icon: "game-icons:rice-cooker" },
  { icon: "mdi:lamp" },
  { icon: "material-symbols:water-heater" },
  { icon: "icon-park-twotone:refrigerator" },
  { icon: "mdi:security-camera" },
  { icon: "material-symbols-light:range-hood-outline" },
  { icon: "cbi:airfryer" },
  { icon: "game-icons:toaster" },
  { icon: "gravity-ui:bucket" },
  { icon: "mingcute:safe-box-fill" },
  { icon: "mdi:broom" },
  { icon: "ph:chair-fill" },
  { icon: "material-symbols:table-bar" },
  { icon: "mdi:wardrobe" },
  { icon: "mdi:stove" },
  { icon: "material-symbols:dishwasher" },
  { icon: "mdi:sink" },
]);

const emit = defineEmits(["close", "updateEdit"]);
const hide = () => {
  emit("close");
};

console.log(props.datas);

const onUpdate = async (id: string) => {
  try {
    const resp: any = await service.detailhome.updatedetail({
      id: props.datas.id,
      amenity_name: props.datas.amenity_name,
      icons: listicon.value[selectedIcons.value[0]].icon,
    });

    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "อัพเดทสำเร็จ",
      });
      emit("updateEdit");
    } else {
      throw new Error("Failed to update status");
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "เกิดข้อผิดพลาด",
    });
  }
};

const toggleSelect = (index: number) => {
  if (selectedIcons.value.includes(index)) {
    selectedIcons.value = [];
  } else {
    selectedIcons.value = [index];
  }
};

const deleteImage = (payload: any, index: number) => {
  payload.splice(index, 1);
};
</script>

<style scoped></style>
