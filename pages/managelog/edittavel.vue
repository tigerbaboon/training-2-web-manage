<template>
  <div class="grow bg-gray-300 p-2 hidden md:block">
    <div class="bg-white m-4 shadow-md rounded-md">
      <div class="w-full p-2 border-b-2 border-gray-300 shadow-md">
        <div class="flex justify-between">
          <div class="text-[30px]">จัดการสถานที่น่าสนใจ</div>
          <div class="flex gap-2">
            <button
              class="text-white w-[150px] h-[40px] border border-gray-300 bg-green-500 rounded-lg flex items-center justify-center gap-1 p-2"
              @click="propmodal">
              <Icon :name="'fluent:add-12-filled'" class="text-gray w-6" />

              เพิ่มสถานที่
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
        <table class="border-collapse border border-gray-100 mt-2 w-full">
          <thead>
            <tr class="bg-gray-600">
              <th class="border border-gray-300 p-2 text-white">ไอดี</th>
              <th class="border border-gray-300 p-2 text-white">ชื่อสถานที่</th>
              <th class="border border-gray-300 p-2 text-white">สถานะ</th>
              <th class="border border-gray-300 p-2 text-white">แก้ไข</th>
              <th class="border border-gray-300 p-2 text-white">ลบ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, x) in items" :key="x">
              <td class="border border-gray-300 p-2 text-center">
                {{ paginate.From + x + 1 }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ item.travel_title }}
              </td>
              <td class="border border-gray-300 p-2">
                <div class="flex justify-center">
                  <label class="inline-flex items-center mb-5 cursor-pointer">
                    <input type="checkbox" v-model="item.status" class="sr-only peer" @click="onUpdate(item)" />
                    <div
                      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                  </label>
                </div>
              </td>
              <td class="border border-gray-300 p-2 grow">
                <div class="flex justify-center">
                  <button class="flex items-center" @click="
                    modal.datas = item;
                  modal.show = true;
                  ">
                    <Icon class="bg-yellow-500" style="width: 30px; height: 30px" name="bx:edit" />
                  </button>
                </div>
                <!-- <pre>{{item}}</pre> -->
              </td>
              <td class="border border-gray-300 p-2">
                <div class="flex justify-center">
                  <button class="flex items-center">
                    <Icon style="width: 30px; height: 30px; color: red" name="material-symbols:delete-outline"
                      @click="onDelete(item.id)" />
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
    </div>

    <!-- <div v-if="modal.show" class="fixed inset-0 bg-opacity-80 z-40 bg-black"> -->
    <div v-if="modal.show" class="fixed inset-0 z-40 bg-black/70">
      <ModalEditTavel v-if="modal.show" class="z-50" :datas="modal.datas" :show="modal.show" @close="closeModal"
        @updateEdit="
          modal.show = false;
        getitem();
        " />
    </div>
    <div v-if="ui.addshow" class="fixed inset-0 z-40 bg-black/70">
      <ModalAddTavel v-if="ui.addshow" class="z-50" :addshow="ui.addshow" :datas="modal.datas" @close="closeAddModal" @updateadd="
        ui.addshow = false;
      getitem();
      " />
    </div>
  </div>

  <div class="w-full bg-slate-100 md:hidden">
    <div class="p-4 bg-white shadow-md rounded-lg m-2">
      <div class="text-lg font-semibold text-gray-700 mb-3">
        <span>จัดการสถานที่น่าสนใจ</span>
        <div class="flex justify-end">
          <button
            class="text-white w-full h-[40px] border border-gray-300 bg-green-500 rounded-lg flex items-center justify-center gap-1 p-2 mt-2"
            @click="propmodal">
            <Icon :name="'fluent:add-12-filled'" class="text-gray w-6" />
            เพิ่มสถานที่
          </button>
        </div>
      </div>
      <input
        class="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
        type="text" placeholder="ค้นหา" v-model="search" @keyup.enter="searchItem()" />
      <div class="h-screen min-h-screen overflow-y-auto">
        <div class="bg-white shadow-lg rounded-lg p-4 mb-2 border border-gray-400 grid grid-cols-1"
          v-for="(item, i) in items" :key="i">
          <div class="w-full h-[170px] mb-1">
            <img class="w-full h-full" :src="item?.image_main?.url" alt="รูปโซน">
          </div>
          <!-- สวิตช์เปิด/ปิดสถานะ -->
          <div class="flex items-center justify-end gap-2 bg-gray-100 px-2 py-1 rounded-sm shadow-md mb-1">
            <span class="text-gray-900 font-medium">สถานะ</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" v-model="item.status" @click="onUpdate(item)" />
              <div
                class="group peer bg-white rounded-full duration-300 w-[35px] h-[14px] ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-[22px] after:w-[22px] after:top-[-4px] after:left-[-2px] after:flex after:justify-center after:items-center peer-checked:after:translate-x-[17px]">
              </div>
            </label>
          </div>
          <div class="w-full">
            <p>ชื่อสถานที่ : <span>{{ item?.travel_title }}</span></p>
            <div class="flex justify-end gap-4 ">
              <button class="border border-yellow-500 px-1 pt-1 rounded-md" @click="
                modal.datas = item;
              modal.show = true;
              ">
                <Icon class="bg-yellow-500 w-[25px] h-[25px]" name="lucide:edit" />
              </button>
              <button class="border border-red-500 px-1 pt-1 rounded-md" @click="onDelete(item.id)">
                <Icon class="bg-red-500 w-[25px] h-[25px]" name="material-symbols:delete-outline" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="modal.show" class="fixed inset-0 z-40 bg-black/70">
        <ModalEditTavel v-if="modal.show" class="z-50" :datas="modal.datas" :show="modal.show" @close="closeModal"
          @updateEdit="
            modal.show = false;
          getitem();
          " />
      </div>
      <div v-if="ui.addshow" class="fixed inset-0 z-40 bg-black/70">
        <ModalAddTavel v-if="ui.addshow" class="z-50" :addshow="ui.addshow" :datas="modal.datas" @close="closeAddModal" @updateadd="
          ui.addshow = false;
        getitem();
        " />
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
  query.value.search = search.value;
  getitem();
};

const getitem = async () => {
  try {
    const resp: any = await service.tavel.list(query.value);
    if (resp.Code == "200") {
      items.value = resp?.Data || [];
      paginate.value = resp?.Paginate || null;
    }
    console.log(resp);
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

const onUpdate = async (item: any) => {
  try {
    const newstatus = !item.status;
    const resp: any = await service.tavel.updateById({
      id: item.id,
      status: newstatus,
    });

    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "อัพเดทสำเร็จ",
      });
      getitem();
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

const onDelete = (id: string) => {
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
        const resp: any = await service.tavel.destroy({
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

interface Modal {
  show: boolean;
  datas: Details;
}

interface Details {
  id: string;
  travel_title: string;
  status: boolean;
  travel_detail: string;
  images: [images];
  image_main: [image_main];
  location_latitute: string;
  location_longitute: string;
  lat: number;
  long: number;
}

interface images {
  id: string;
  url: string;
}

interface image_main {
  id: string;
  url: string;
}

const modal = ref<Modal>({
  show: false,
  datas: {
    id: "",
    travel_title: "",
    status: false,
    travel_detail: "",
    images: [
      {
        id: "",
        url: "",
      },
    ],
    image_main: [
      {
        id: "",
        url: "",
      },
    ],
    location_latitute: "",
    location_longitute: "",
    lat: 0,
    long: 0,
  },
});

// const toggle = async (id: string) => {

//   try {
//     const resp: any = await service.product.GetById({
//       id: id,
//       status: modal.value.datas.status,
//     });
//     console.log(resp);

//     if (resp.Code == "200") {
//       await Swal.fire({
//         icon: "success",
//         title: "อัพเดทสำเร็จ",
//       });
//       modal.value.show = !modal.value.show;
//       modal.value.datas = resp.Data;
//     }
//     // console.log(resp);
//   } catch (error: any) {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: error.message || "เกิดข้อผิดพลาด",
//     });
//   }
// };

const closeModal = () => {
  modal.value.show = false;
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
