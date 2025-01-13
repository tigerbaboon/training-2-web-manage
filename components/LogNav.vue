<template>
  <div
    v-if="show"
    class=" w-[60px] md:w-[60px] lg:w-[300px] bg-[#1c2434] border-r-2 border-gray-300"
  >
    <div>
      <div class="space-y-[125px] p-3 grow">
        <div class="flex flex-col grow gap-4 mt-5">
          <button
            v-for="(last, index) in menus"
            :key="index"
            class="w-[35px] md:w-[35px] lg:w-[270px] lg:h-[50px] p-2 text-white hover:bg-gray-400 rounded-lg bg-gray-700 flex items-center"
            :class="
              last.link === route.path
                ? 'bg-gray-900 flex items-center  '
                : ''
            "
            @click="(selected = last), router.push(last.link)"
          >
            <div class="flex items-center gap-2">
              <Icon :name="last.icon" class="text-white" />
              <span class="hidden md:hidden lg:block ">{{ last.title }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="hidden md:hidden lg:block bg-[#d1d5db]  h-screen">
    <Icon
      @click="show = !show"
      :name="show ? 'mingcute:left-fill' : 'material-symbols:menu'"
      class="text-gray-500 w-9 h-9 ml-3 mt-3 cursor-pointer"
    />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
});

const route = useRoute();
const router = useRouter();

interface Menu {
  active: boolean;
  title: string;
  link: string;
  icon: string;
}
const show = ref<boolean>(true);

const menus = ref<Menu[]>([
  {
    active: false,
    title: "แก้ไขที่พัก",
    link: "/managelog/edithome",
    icon: "ri:home-gear-fill",
  },
  {
    active: false,
    title: "จัดการโซน",
    link: "/managelog/editzone",
    icon: "subway:location-3",
  },
  {
    active: false,
    title: "จัดการโฆษณา",
    link: "/managelog/editadvert",
    icon: "icons8:advertising",
  },
  {
    active: false,
    title: "จัดการสถานที่น่าสนใจ",
    link: "/managelog/edittavel",
    icon: "fa6-solid:map-location",
  },
  {
    active: false,
    title: "ประวัติการลงประกาศเช่า",
    link: "/managelog/logmanage",
    icon: "icon-park-outline:log",
  },
  {
    active: false,
    title: "ลงข้อมูลสิ่งอำนวยความสะดวก",
    link: "/managelog/detailhome",
    icon: "icon-park-outline:log",
  },
  {
    active: false,
    title: "ลงทะเบียนบ้าน",
    link: "/managelog/confirmation",
    icon: "fluent-mdl2:waitlist-confirm-mirrored",
  },
]);
const selected = ref<any>(menus.value[0]);
</script>
