<template>
  <div class="grow bg-gray-300 p-2 hidden md:block">
    <div class="bg-white m-4 shadow-md rounded-md">
      <div class="w-full p-2 border-b-2 border-gray-300 shadow-md">
        <div class="flex justify-between">
          <div class="text-[30px]">จัดการสถานที่น่าสนใจ</div>
          <div class="flex gap-2">
            <div
              class="text-black text-center bg-white border border-gray-300 w-[250px] h-[40px] rounded-lg flex justify-center items-center"
            >
              <Icon
                :name="'ic:baseline-search'"
                class="text-gray w-[30px] h-[30px] outline-none"
              />
              <input
                class="outline-none w-[180px] h-[30px] rounded-lg ml-2"
                type="text"
                placeholder="ค้นหา"
                v-model="search"
                @keyup.enter="searchItem()"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="p-5">
        <table class="border-collapse border border-gray-100 mt-2 w-full ">
          <thead>
            <tr class="bg-gray-600">
              <th class="border border-gray-300 p-2 text-white">ไอดี</th>
              <th class="border border-gray-300 p-2 text-white">ชื่อสถานที่</th>
              <th class="border border-gray-300 p-2 text-white">ประเภทบ้านพัก</th>
              <th class="border border-gray-300 p-2 text-white">ประเภทการขาย</th>
              <th class="border border-gray-300 p-2 text-white">เวลา</th>
              <th class="border border-gray-300 p-2 text-white">คนลงประกาศ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, x) in items" :key="x">
              <td class="border border-gray-300 p-3 text-center">
                {{ paginate.From + x + 1 }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ item.house_name }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ item.house_type }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ item.sell_type }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ formatUnixTime(item.created_at) }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ item.created_by }}
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="paginate" class="flex justify-between mt-2">
          <div>
            แสดง {{ paginate?.From + 1 }} ถึง
            {{ paginate?.From + paginate?.Size }} จากทั้งหมด
            {{ paginate?.Total }} รายการ
          </div>

          <div class="flex gap-2">
            <template
              v-for="page in Math.ceil(paginate.Total / paginate.Size)"
              key="index.page"
            >
              <button
                class="bg-gray-500 px-2 rounded text-white hover:bg-gray-400"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </template>
          </div>

          <div class="flex gap-4">
            <select v-model="query.size" @change="getitem()">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full bg-slate-100 md:hidden">
    <div class="p-4 bg-white shadow-md rounded-lg m-2">
      <div class="text-lg font-semibold text-gray-700 mb-3">
        <span>จัดการสถานที่น่าสนใจ</span>
      </div>
      <input
        class="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
        type="text"
        placeholder="ค้นหา"
        v-model="search"
        @keyup.enter="searchItem()"
      />
      <div class="h-screen min-h-screen overflow-y-auto">
        <div
          class="shadow-lg rounded-lg p-4 mb-2 border border-gray-400 grid grid-cols-1"
          v-for="(item, i) in items"
          :key="i"
          :class="{ 'bg-gray-200': i % 2 === 0, 'bg-white': i % 2 !== 0 }"
        >
          <p class="border border-gray-300 p-2 text-green-500">
                ชื่อโครงการ :
                <span class="text-center text-gray-800">{{
                  item.house_name
                }}</span>
              </p>
          <div class="w-full grid grid-cols-1 gap-1 mt-2">
            <div class="flex items-center gap-2">
              <Icon :name="'bx:bxs-time-five'" class="text-gray-500 w-6 h-6" />
              <p class="text-gray-600">
                เวลาลงประกาศ :
                <span class="text-center text-gray-800">{{
                  formatUnixTime(item.created_at)
                }}</span>
              </p>
            </div>

            <div class="flex items-center gap-2">
              <Icon :name="'bx:bxs-home'" class="text-gray-500 w-6 h-6" />
              <p class="text-gray-600">
                ประเภทที่พัก :
                <span class="text-center text-gray-800">{{
                  item.house_type
                }}</span>
              </p>
            </div>
            <div class="flex items-center gap-2">
              <Icon
                :name="'mingcute:currency-baht-fill'"
                class="text-gray-500 w-6 h-6"
              />
              <p class="text-gray-600">
                ประเภทการขาย :
                <span class="text-center text-gray-800">{{
                  item.sell_type
                }}</span>
              </p>
            </div>
            <div class="flex items-center gap-2">
              <Icon
                :name="'mingcute:file-check-fill'"
                class="text-gray-500 w-6 h-6"
              />
              <p class="text-gray-600">
                ชื่อคนลงประกาศ :
                <span class="text-center text-gray-800">{{
                  item.created_by
                }}</span>
              </p>
            </div>
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
  layout: "default",
  middleware: "auth",
});

const query = ref<any>({
  from: "0",
  size: "10",
  travel_title: "travel_title",
  status: "status",
  search: "",
});
const search = ref<string>("");
const items = ref<any>([]);
const paginate = ref<any>(null);

const changePage = (page: number) => {
  console.log(page);

  query.value.from = (page - 1) * parseInt(query.value.size);
  getitem();
};

const searchItem = () => {
  query.value.search_by_name = search.value;
  getitem();
};

const getitem = async () => {
  try {
    const resp: any = await service.house.GetHouseHistory(query.value);
    if (resp.Code == "200") {
      items.value = resp?.Data || [];
      paginate.value = resp?.Paginate || null;
    }
    console.log(paginate);
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};




const formatUnixTime = (unixTime: number) => {
  const date = new Date(unixTime * 1000);
  return date.toLocaleString();
};

interface Ui {
  addshow: boolean;
}

const ui = ref<Ui>({
  addshow: false,
});

const propmodal = () => {
  ui.value.addshow = !ui.value.addshow;
};


onMounted(() => {
  getitem();
});
</script>
