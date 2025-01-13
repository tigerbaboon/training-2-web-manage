<template>
  <div class=" w-[300px] bg-gray-100">
    <div class="border-b-2 border-gray-300">
      <div class="flex flex-row space-y-[125px] p-[5px] grow">
        <div class="grow">
          <button
              v-for="(last, index) in menus"
              :key="index"
              class="p-2 hover:bg-white rounded-l-lg "
              :class="last.active ? 'bg-white rounded-lg' : ''"
              @click="(selected = last), router.push(last.link)"
            >
              <div class="flex items-center gap-2 ">
                {{ last.title }}
              </div>
            </button>
        </div>
      </div>
    </div>
    <!-- <div v-if="selected">
      <div class="mt-[5px] ml-[30px] text-gray-200 text-[25px]">
      </div>
      <div class="flex pt-[10px] flex-col">
        <div class="p-[10px]">
          <nuxt-link
            v-for="(forward, index) in selected.childs"
            :key="index"
            class="flex m-[10px] h-screen rounded-lg p-5 text-gray-500 ml-2"
            :class="
              forward.link == route.path
                ? 'text-white bg-gray-300 flex items-center '
                : ''
            "
            :to="forward.link"
            :name="forward.name"
          >
          </nuxt-link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
});

const route = useRoute();
const router = useRouter();

const menus = ref<any[]>([
  {
    active: false,
    title: "ข้อมูล",
    link: "/homeedit/newhome",
  },
  {
    active: false,
    title: "รูปภาพ",
    link: "/homeedit/imgeedit",
  },
  {
    active: false,
    title: "แผนที่",
    link: "/homeedit/mapedit",
  },
  {
    active: false,
    title: "ยืนยันข้อมูล",
    link: "/homeedit/confirmmanage",

  },
]);
const selected = ref<any>(menus.value[0]);
</script>
