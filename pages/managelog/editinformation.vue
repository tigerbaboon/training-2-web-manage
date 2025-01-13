<template>
  <div class=" bg-gray-300 grow">
    <div class=" bg-white m-4 shadow-md rounded-md">
      <div class=" w-full p-2 border-b-2 border-gray-300 shadow-md">
        <div class="flex justify-between">
          <div class="text-[30px]">ข้อมูลผู้ประกาศเช่า</div>
          <div>
            <input
              class="text-black text-center bg-white border border-gray-300 w-[200px] h-[30px]"
              type="text"
              placeholder="ค้นหา"
            />
          </div>
        </div>
      </div>
      <div class="p-5">
        <table class="border-collapse border border-gray-400 mt-2 w-full">
          <thead>
            <tr class="bg-gray-600">
              <th class="border border-gray-300 p-2 text-white">ไอดี</th>
              <th class="border border-gray-300 p-2 text-white">ชื่อโครงการ</th>
              <th class="border border-gray-300 p-2 text-white">ชื่อ</th>
              <th class="border border-gray-300 p-2 text-white">นามสกุล</th>
              <th class="border border-gray-300 p-2 text-white">เบอร์โทร</th>
              <th class="border border-gray-300 p-2 text-white">Admin</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, i) in logs" :key="i">
              <td class="border border-gray-300 p-2 text-center">
                {{ i + 1 }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ result.project }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ result.name }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ result.surname }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ result.phone }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ result.edit }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

interface Log {
  project: string;
  name: string;
  surname: string;
  phone: string;
  edit: string;
}

interface Section {
  id: string;
  nameproject: string;
  name: string;
  surname: string;
  phone: string;
  edit: string;
}

const sections = ref<Section[]>([
  {
    id: "ไอดี",
    nameproject: "ชื่อโครงการ",
    name: "ชื่อ",
    surname: "นามสกุล",
    phone: "เบอร์โทร",
    edit: "Admin",
  },
]);

const logs = ref<Log[]>([
  {
    project: "homepimantane",
    name: "Isaac",
    surname: "Newton",
    phone: "1234567890",
    edit: "earth",
  },
  {
    project: "t-space",
    name: "best",
    surname: "humsing",
    phone: "1234567890",
    edit: "moon",
  },
  {
    project: "t-premo",
    name: "prem",
    surname: "humsing",
    phone: "1234567890",
    edit: "sun",
  },
  {
    project: "tuk-tuk",
    name: "zero",
    surname: "humsing",
    phone: "1234567890",
    edit: "star",
  },
  {
    project: "mor ko",
    name: "tra",
    surname: "humsing",
    phone: "1234567890",
    edit: "planet",
  },
  {
    project: "kingpower",
    name: "bar",
    surname: "humsing",
    phone: "1234567890",
    edit: "mars",
  },
]);


</script>
