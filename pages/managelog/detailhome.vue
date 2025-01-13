<template>
  <div class="bg-gray-300 grow hidden md:block">
    <div class=" bg-white m-4 shadow-md rounded-md ">
      <div class="w-full p-2 border-b-2 border-gray-300 shadow-md">
        <div class="flex justify-between">
          <div class="text-[30px]">จัดการสิ่งอำนวยความสะดวก</div>
          <div class="flex gap-2">
            <button
              class="text-white w-[250px] h-[40px] border border-gray-300 bg-green-500 rounded-lg flex items-center justify-center gap-1 p-2"
              @click="propmodal">
              <Icon :name="'fluent:add-12-filled'" class="text-gray w-6" />

              เพิ่มสิ่งอำนวยความสะดวก
            </button>
            <div
              class="text-black text-center bg-white border border-gray-300 w-[250px] h-[40px] rounded-lg flex justify-center items-center">
              <Icon :name="'ic:baseline-search'" class="text-gray w-[30px] h-[30px] outline-none" />
              <input class="outline-none w-[180px] h-[30px] rounded-lg ml-2" type="text" placeholder="ค้นหา"
                v-model="search" @keyup.enter="searchItem()" />
            </div>
          </div>
        </div>
      </div>
      <div class="p-5">
        <table class="border-collapse border border-gray-100 mt-2 w-full relative">
          <thead>
            <tr class="bg-gray-600">
              <th class="border border-gray-300 p-2 text-white">ไอดี</th>
              <th class="border border-gray-300 p-2 text-white">ชื่อสิ่งอำนวยความสะดวก</th>
              <th class="border border-gray-300 p-2 text-white">ไอคอน</th>
              <th class="border border-gray-300 p-2 text-white">แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, i) in items" :key="i">
              <td class="border border-gray-300 p-2 text-center">
                {{ paginate.From + i + 1 }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ result.amenity_name }}
              </td>
              <td class="border border-gray-300 p-2 grow">
                <div class="flex justify-center">
                    <Icon class="bg-gray-500" style="width: 30px; height: 30px" :name="result.icons" />
                </div>
              </td>
              <td class="border border-gray-300 p-2 grow">
                <div class="flex justify-center">
                  <button class="flex items-center" @click="
                    modal.datas = result;
                  modal.show = true;
                  ">
                    <Icon class="bg-yellow-500" style="width: 30px; height: 30px" name="bx:edit" />
                  </button>
                </div>
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
            <template v-for="page in Math.ceil(paginate.Total / paginate.Size)" key="index.page">
              <button class="bg-gray-500 px-2 rounded text-white hover:bg-gray-400" @click="changePage(page)">
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
      <div v-if="modal.show" class="fixed inset-0 bg-opacity-80 z-40 bg-black">
        <ModalEditDetail v-if="modal.show" class="z-50" :datas="modal.datas" :show="modal.show" @close="closeModal"
          @updateEdit="
            modal.show = false;
          getitem();
          " />
      </div>
      <div v-if="ui.addshow" class="fixed inset-0 bg-opacity-80 z-40 bg-black">
        <ModalAddDetail v-if="ui.addshow" class="z-50" :addshow="ui.addshow" @close="closeAddModal" @updateadd="
          ui.addshow = false;
        getitem();
        " />
      </div>
    </div>
  </div>

  <div class="w-full bg-slate-100 md:hidden">
    <div class="p-4 bg-white shadow-md rounded-lg m-2">
      <div class="text-lg font-semibold text-gray-700 mb-3">
        <span>จัดการสิ่งอำนวยความสะดวก</span>
        <div class="flex justify-end">
          <button
            class="text-white w-full h-[40px] border border-gray-300 bg-green-500 rounded-lg flex items-center justify-center gap-1 p-2 mt-2"
            @click="propmodal">
            <Icon :name="'fluent:add-12-filled'" class="text-gray w-6" />
            เพิ่มสิ่งอำนวยความสะดวก
          </button>
        </div>
      </div>
      <input
        class="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
        type="text" placeholder="ค้นหา" v-model="search" @keyup.enter="searchItem()" />
      <div class="overflow-y-auto">
        <div class="bg-white shadow-md rounded-lg p-4 mb-2 border border-gray-200" v-for="(result, i) in items"
          :key="i">
          <div class="flex justify-between items-center">
            <p class="text-gray-800 font-medium text-lg">
              ชื่อ: <span class="text-gray-600 font-normal">{{ result?.amenity_name }}</span>
            </p>
            <button class="border border-yellow-500 px-1 pt-1 rounded-md" @click="
              modal.datas = result;
            modal.show = true;
            ">
              <Icon class="bg-yellow-500 w-[25px] h-[25px]" name="lucide:edit" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modal.show" class="fixed inset-0 bg-opacity-80 z-40 bg-black">
      <ModalEditDetail v-if="modal.show" class="z-50" :datas="modal.datas" :show="modal.show" @close="closeModal"
        @updateEdit="
          modal.show = false;
        getitem();
        " />
    </div>
    <div v-if="ui.addshow" class="fixed inset-0 bg-opacity-80 z-40 bg-black">
      <ModalAddDetail v-if="ui.addshow" class="z-50" :addshow="ui.addshow" @close="closeAddModal" @updateadd="
        ui.addshow = false;
      getitem();
      " />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import service from "~/service";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

interface Modal {
  show: boolean;
  datas: Details;
}

interface Details {
  amenity_name: string;
  icons: string;
}

const modal = ref<Modal>({
  show: false,
  datas: {
    amenity_name: "",
    icons: "",
  },
});

const items = ref<any[]>([]);
const search = ref<string>("");
const paginate = ref<any>(null);

const query = ref<any>({
  from: "0",
  size: "10",
  id: "id",
  amenity_name: "amenity_name",
  icons: "icons",
});

const changePage = (page: number) => {
  query.value.from = (page - 1) * parseInt(query.value.size);
  getitem();
};

const getitem = async () => {
  try {
    const resp: any = await service.detailhome.listdetail(query.value);
    if (resp.Code == "200") {
      items.value = resp?.Data || [];
      paginate.value = resp?.Paginate || null;
    }
    console.log(items.value);
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

const closeModal = () => {
  modal.value.show = false;
};

const searchItem = () => {
  query.value.search = search.value;
  getitem();
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

const closeAddModal = () => {
  ui.value.addshow = false;
};

onMounted(() => {
  getitem();
});
</script>
