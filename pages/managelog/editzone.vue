<template>
  <div class="bg-gray-300 grow hidden md:block">
    <div class="bg-white m-4 shadow-md rounded-md">
      <div class="w-full p-2 border-b-2 border-gray-300 shadow-md">
        <div class="flex justify-between">
          <div class="text-[30px]">จัดการโซน</div>
          <div class="flex gap-2">
            <button
              class="text-white w-[150px] h-[40px] border border-gray-300 bg-green-500 rounded-lg flex items-center justify-center gap-1 p-2"
              @click="propmodal">
              <Icon :name="'fluent:add-12-filled'" class="text-gray w-6" />

              เพิ่มโซน
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
              <th class="border border-gray-300 p-2 text-white">ชื่อโซน</th>
              <th class="border border-gray-300 p-2 text-white">แก้ไข</th>
              <th class="border border-gray-300 p-2 text-white">ลบ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, i) in items" :key="i">
              <td class="border border-gray-300 p-2 text-center">
                {{ paginate.From + i + 1 }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ result.zone_name }}
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
              <td class="border border-gray-300 p-2">
                <div class="flex justify-center">
                  <button class="flex items-center">
                    <Icon style="width: 30px; height: 30px; color: red" name="material-symbols:delete-outline"
                      @click="delbyzone(result.id)" />
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
        <ModalEditZone v-if="modal.show" class="z-50" :datas="modal.datas" :show="modal.show" @close="closeModal"
          @updateEdit=" 
            modal.show = false;
          getitem();
          " />
      </div>
      <div v-if="ui.addshow" class="fixed inset-0 bg-opacity-80 z-40 bg-black">
        <ModalAddZone v-if="ui.addshow" class="z-50" :addshow="ui.addshow" @close="closeAddModal" @updateadd="
          ui.addshow = false;
        getitem();
        " />
      </div>
    </div>
  </div>

  <!-- จอโทรศัพท์ -->
  <div class="w-full bg-slate-100 md:hidden">
    <div class="p-4 bg-white shadow-md rounded-lg m-2">
      <div class="text-lg font-semibold text-gray-700 mb-3 flex justify-between">
        <span>จัดการโซน</span>
        <button
          class="text-white w-[150px] h-[40px] border border-gray-300 bg-green-500 rounded-lg flex items-center justify-center gap-1 p-2"
          @click="propmodal">
          <Icon :name="'fluent:add-12-filled'" class="text-gray w-6" />
          เพิ่มโซน
        </button>
      </div>
      <input
        class="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
        type="text" placeholder="ค้นหา" v-model="search" @keyup.enter="searchItem()" />
      <div class="h-screen min-h-screen overflow-y-auto">
        <div class="bg-white shadow-lg rounded-lg p-4 mb-2 border border-gray-300 grid grid-cols-2 "
          v-for="(result, i) in items" :key="i">
          <div class="w-full max-w-[120px] h-[80px] overflow-hidden rounded-lg " v-for="img in result?.image">
            <img class="w-full h-full object-cover" :src="img?.url" alt="รูปโซน" />
          </div>
          <div class="space-y-3 flex flex-col justify-between">
            <p class="text-gray-800 text-sm font-semibold truncate">
              ชื่อโซน: <span class="text-gray-600 font-normal">{{ result?.zone_name }}</span>
            </p>
            <div class="flex justify-end gap-4 ">
              <button class="border border-yellow-500 px-1 pt-1 rounded-md" @click="
                modal.datas = result;
              modal.show = true;
              ">
                <Icon class="bg-yellow-500 w-[25px] h-[25px]" name="lucide:edit" />
              </button>
              <button class="border border-red-500 px-1 pt-1 rounded-md" @click="delbyzone(result.id)">
                <Icon class="bg-red-500 w-[25px] h-[25px]" name="material-symbols:delete-outline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modal.show" class="fixed inset-0 bg-opacity-80 z-40 bg-black">
        <ModalEditZone v-if="modal.show" class="z-50" :datas="modal.datas" :show="modal.show" @close="closeModal"
          @updateEdit="
            modal.show = false;
          getitem();
          " />
      </div>
      <div v-if="ui.addshow" class="fixed inset-0 bg-opacity-80 z-40 bg-black">
        <ModalAddZone v-if="ui.addshow" class="z-50" :addshow="ui.addshow" @close="closeAddModal" @updateadd="
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
  zone_name: string;
  lat: string;
  long: string;
  image: [image];
}

interface image {
  id: string;
  url: string;
}

const modal = ref<Modal>({
  show: false,
  datas: {
    zone_name: "",
    lat: "",
    long: "",
    image: [
      {
        id: "",
        url: "",
      },
    ],
  },
});

const items = ref<any[]>([]);
const search = ref<string>("");
const paginate = ref<any>(null);

const query = ref<any>({
  from: "0",
  size: "10",
  id: "id",
  zone_name: "zone_name",
  lat: "lat",
  long: "long",
  search: "",
});

const changePage = (page: number) => {
  query.value.from = (page - 1) * parseInt(query.value.size);
  getitem();
};

const getitem = async () => {
  try {
    const resp: any = await service.zone.listzone(query.value);
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

// const logs = ref<Log[]>([
//   {
//     zone: "หลังมอ",
//     editzone: "บ้านเดี่ยว",
//     lat: 5446549846564,
//     long: 695496544694654,
//   },
//   {
//     zone: "t-space",
//     editzone: "หมู่บ้าน",
//     lat: 84859649649541,
//     long: 6541561964554,
//   },
//   {
//     zone: "t-premo",
//     editzone: "บ้านคู่",
//     lat: 564651261641651,
//     long: 6546496456416541,
//   },
//   {
//     zone: "tuk-tuk",
//     editzone: "บ้านเดี่ยว",
//     lat: 9654984646663345,
//     long: 4654694654965456,
//   },
//   {
//     zone: "mor ko",
//     editzone: "บ้านเดี่ยว",
//     lat: 879846954556,
//     long: 463212645641,
//   },
//   {
//     zone: "kingpower",
//     editzone: "กระต็อบ",
//     lat: 96841654954,
//     long: 23264654968545,
//   },
// ]);

// const toggle = (items: Log) => {
//   console.log(items);
//   modal.value.show = !modal.value.show;
//   modal.value.datas.name = items.zone;
//   modal.value.datas.lat = items.lat;
//   modal.value.datas.long = items.long;
// };

const closeModal = () => {
  modal.value.show = false;
};

const delbyzone = (id: string) => {
  Swal.fire({
    icon: "info",
    title: "ลบรายการ",
    text: "ต้องการที่จะลบหรือไม่",
    showCancelButton: true,
    confirmButtonText: "ลบ",
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        console.log(id);
        const resp: any = await service.zone.DeleteZone({
          id: id,
        });
        if (resp.Code == "200") {
          await Swal.fire({
            icon: "success",
            title: "ลบสำเร็จ",
          });
          getitem();
        }
      } catch (error: any) {
        Swal.fire({
          title: "The Error",
          icon: "question",
        });
      }
    }
  });
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
