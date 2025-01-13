<template>
  <div class="flex justify-center items-center h-screen w-full relative">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
      v-if="props.addshow"
    >
      <div
        class="bg-white shadow-xl rounded-lg p-6 w-[90%] max-w-[400px] md:max-w-[920px] h-auto overflow-auto relative"
      >
        <div>
          <div class="flex flex-col items-center">
            <h1 class="text-[25px] font-semibold text-center mb-4">
              เพิ่มสิ่งอำนวยความสะดวก
            </h1>
            <input
              class="border border-gray-300 focus:border-blue-500 outline-none shadow-sm rounded-lg p-4 w-full text-center text-gray-700"
              placeholder="เพิ่มสิ่งอำนวยความสะดวก"
              v-model="amenity_name"
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

const selectedIcons = ref<number[]>([]);
const amenity_name = ref<string>("");
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
  { icon: "material-symbols:table-bar"},
  { icon: "mdi:wardrobe"},
  { icon: "mdi:stove"}
]);

const onSubmit = async () => {
  try {
    const resp: any = await service.detailhome.createdetail({
      amenity_name: amenity_name.value,
      icons: listicon.value[selectedIcons.value[0]].icon,
    });

    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "เพิ่มสิ่งอำนวยความสะดวกสำเร็จ",
      });
      emit("updateadd");
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
    selectedIcons.value = selectedIcons.value.filter((i) => i !== index);
  } else {
    selectedIcons.value.push(index);
  }
};

const emit = defineEmits(["close", "updateadd"]);
const AddModal = () => {
  emit("close");
};

const props = defineProps<{
  addshow: Boolean;
}>();
</script>

<style scoped></style>
