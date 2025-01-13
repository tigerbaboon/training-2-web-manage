<template>
  <div class="bg-gray-300 grow hidden md:block">
    <div class="bg-white m-4 shadow-md rounded-md ">
      <div class="p-2 border-b-2 border-gray-300 shadow-md">
        <div class="flex justify-between">
          <div class="text-[15px] md:text-[20px] lg:text-[30px]">
            แก้ไขที่พัก
          </div>
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
              v-model="search_by_name"
              @keyup.enter="searchItem()"
            />
          </div>
        </div>
      </div>
      <div class="p-5">
        <table class="border-collapse border border-gray-100 mt-2 w-full">
          <thead>
            <tr class="bg-gray-600">
              <th class="border border-gray-300 p-2 text-white">ไอดี</th>
              <th class="border border-gray-300 text-white">ชื่อโครงการ</th>
              <th class="border border-gray-300 text-white">ประเภทที่พัก</th>
              <th class="border border-gray-300 text-white">รายการแนะนำ</th>
              <th class="border border-gray-300 text-white">แก้ไข</th>
              <th class="border border-gray-300 text-white">ลบ</th>
            </tr>
          </thead>
          <tbody>
            <tr class="" v-for="(result, i) in getHouse.datas" :key="i">
              <td class="border border-gray-300 p-2 text-center">
                <p class="w-[20px] md:w-[30px] lg:w-[60px]">
                  {{ getHouse.paginate.from + i + 1 }}
                </p>
              </td>
              <td class="border w-full border-gray-300">
                <p class="truncate px-2 w-[10px] md:w-[150px] lg:w-[500px]">
                  {{ result.house_name }}
                </p>
              </td>
              <td class="border border-gray-300 text-center">
                <p class="w-[10px] md:w-[80px] lg:w-[150px]">
                  {{ result.house_type }}
                </p>
              </td>
              <td class="border border-gray-300 p-2">
                <div class="flex justify-center">
                  <label class="inline-flex items-center mb-5 cursor-pointer">
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      v-model="result.is_recommend"
                      @click="statusHouse(result)"
                    />
                    <div
                      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                    <span
                      class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                    ></span>
                  </label>
                </div>
              </td>
              <td class="border w-[80px] border-gray-300 px-10">
                <div class="flex justify-center">
                  <button class="flex items-center">
                    <Icon
                      class="bg-yellow-500"
                      style="width: 30px; height: 30px"
                      name="lucide:edit"
                      @click="router.push(`/managelog/edithome/${result.id}`)"
                    />
                  </button>
                </div>
              </td>
              <td class="border w-[80px] p-2 border-gray-300 px-10">
                <div class="flex justify-center">
                  <button class="flex items-center">
                    <Icon
                      style="width: 30px; height: 30px; color: red"
                      name="material-symbols:delete-outline"
                      @click="deletehouse(result.id)"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="getHouse.paginate" class="flex justify-between mt-2">
          <div>
            แสดง {{ getHouse.paginate.from + 1 }} ถึง
            {{ getHouse.paginate.from + getHouse.paginate.size }} จากทั้งหมด
            {{ getHouse.paginate.total }} รายการ
          </div>

          <div class="flex gap-2">
            <template
              v-for="page in Math.ceil(
                getHouse.paginate.total / getHouse.paginate.size
              )"
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
            <select v-model="getHouse.query.size" @change="getHouselist()">
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

  <!-- จอโทรศัพท์ -->
  <div class="w-full bg-slate-100 md:hidden">
    <div class="p-4 bg-white shadow-md rounded-lg m-2">
      <div class="text-lg font-semibold text-gray-700 mb-3">แก้ไขที่พัก</div>
      <input
        class="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
        type="text"
        placeholder="ค้นหา"
        v-model="search_by_name"
        @keyup.enter="searchItem()"
      />
      <div class="h-screen min-h-screen overflow-y-auto">
        <div
          class="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-400"
          v-for="(result, i) in getHouse?.datas"
          :key="i"
        >
          <div class="w-full h-[150px] mb-3">
            <!-- แก้interface -->
            <img
              class="w-full h-full rounded-md object-cover"
              :src="result?.images_main?.url"
              alt="รูปหน้าปก"
            />
          </div>
          <div
            class="flex items-center justify-end gap-2 bg-gray-100 px-2 py-1 rounded-md shadow-md"
          >
            <span class="text-gray-900 font-medium">แนะนำ</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                v-model="result.is_recommend"
                @click="statusHouse(result)"
              />
              <div
                class="group peer bg-white rounded-full duration-300 w-[35px] h-[14px] ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-[22px] after:w-[22px] after:top-[-4px] after:left-[-2px] after:flex after:justify-center after:items-center peer-checked:after:translate-x-[17px]"
              ></div>
            </label>
          </div>
          <div class="grid grid-cols-1 gap-y-1">
            <div class="truncate font-semibold text-gray-700">
              {{ result.house_name }}
            </div>
            <p class="text-sm text-gray-600">
              ประเภทการขาย:
              <span class="font-medium text-sky-950">{{
                result.sell_type
              }}</span>
            </p>
            <p class="text-sm text-gray-600">
              ประเภทที่พัก:
              <span class="font-medium text-sky-950">{{
                result.house_type
              }}</span>
            </p>
            <!-- แก้interface -->
            <p class="text-sm text-gray-600">
              ลงประกาศเมื่อ:
              <span class="font-medium text-sky-950">
                {{ formatUnixTime(result.created_at) }}
              </span>
            </p>
          </div>
          <div class="flex justify-end gap-4">
            <button
              class="border border-yellow-500 px-1 pt-1 rounded-md"
              @click="router.push(`/managelog/edithome/${result.id}`)"
            >
              <Icon
                class="bg-yellow-500 w-[25px] h-[25px]"
                name="lucide:edit"
              />
            </button>
            <button
              class="border border-red-500 px-1 pt-1 rounded-md"
              @click="deletehouse(result.id)"
            >
              <Icon
                class="bg-red-500 w-[25px] h-[25px]"
                name="material-symbols:delete-outline"
              />
            </button>
          </div>
        </div>
      </div>
      <!-- paginate ของ mobile งงๆอยู่ยังทำไมได้ -->
      <!-- <div v-if="mobileGetHouse.paginate" class="flex justify-between mt-2">
          <div>
            แสดง {{ mobileGetHouse.paginate.from + 1 }} ถึง
            {{ mobileGetHouse.paginate.from + mobileGetHouse.paginate.size }} จากทั้งหมด
            {{ mobileGetHouse.paginate.total }} รายการ
          </div>

          <div class="flex gap-2">
            <template v-for="page in Math.ceil(
              mobileGetHouse.paginate.total / mobileGetHouse.paginate.size
            )" key="index.page">
              <button class="bg-gray-500 px-2 rounded text-white hover:bg-gray-400" @click="changePageMobile(page)">
                {{ page }}
              </button>
            </template>
          </div>

          <div class="flex gap-4">
            <select v-model="mobileGetHouse.query.size" @change="getHouselist()">
              <option value="10">2</option>
              <option value="20">4</option>
              <option value="50">6</option>
              <option value="100">10</option>
            </select>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import service from "~/service";
import type { getHouseList } from "~/models/house.model";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

const router = useRouter();
const search_by_name = ref<string>("");


const getHouse = ref<getHouseList>({
  datas: [],
  query: {
    from: 0,
    size: 10,
    search_by_name: "",
  },
  loading: false,
  paginate: {
    from: 0,
    size: 10,
    total: 0,
  },
});

const changePage = (page: number) => {
  getHouse.value.query.from = (page - 1) * getHouse.value.query.size;
  getHouselist();
};

// paginate ของ mobile งงๆอยู่ยังทำไมได้
// const mobileGetHouse = ref<getHouseList>({
//   datas: [],
//   query: {
//     from: 0,
//     size: 10,
//     search_by_name: "",
//   },
//   loading: false,
//   paginate: {
//     from: 0,
//     size: 10,
//     total: 0,
//   },
// });

// const changePageMobile = (page: number) => {
//   mobileGetHouse.value.query.from = (page - 1) * mobileGetHouse.value.query.size;
//   getHouselist();
// };

const searchItem = () => {
  getHouse.value.query.search_by_name = search_by_name.value;
  getHouselist();
};

const getHouselist = async () => {
  getHouse.value.loading = true;
  await service.house
    .listhouse(getHouse.value.query)
    .then((resp: any) => {
      getHouse.value.datas = resp.Data;
      getHouse.value.paginate.from = resp.Paginate.From;
      getHouse.value.paginate.size = resp.Paginate.Size;
      getHouse.value.paginate.total = resp.Paginate.Total;
    })
    .catch((error: any) => {
      Swal.fire({
        title: "The Error",
        icon: "question",
      });
    })
    .finally(() => {
      getHouse.value.loading = false;
    });
};

const deletehouse = (id: string) => {
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
        console.log("id", id);
        const resp: any = await service.house.delhouse({
          id: id,
        });
        if (resp.Code == "200") {
          await Swal.fire({
            icon: "success",
            title: "ลบสำเร็จ",
          });
          getHouselist();
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

const statusHouse = async (result: any) => {
  console.log("result", result.is_recommend);
  try {
    const newStatus = !result.is_recommend;
    const resp: any = await service.house.UpdateStatusHouse({
      id: result.id,
      is_recommend: newStatus,
    });
    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "อัพเดทสำเร็จ",
      });
      getHouselist();
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

const titlePage = useCookie("title_page");

const formatUnixTime = (unixTime: number) => {
  const date = new Date(unixTime * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

onMounted(() => {
  getHouselist();
});
</script>
