<template>
  <TopNav />
  <div class="flex">
    <div>
      <LeftNav />
      <slot></slot>
    </div>
    <div>
      <ResultEdit />
    </div>
  </div>
</template>
<script lang="ts" setup>
import LeftNav from "~/components/AddInformation/LeftNav.vue";
import ResultEdit from "~/components/AddInformation/ResultEdit.vue";



watch(
  () => route.path,
  () => {
    checkMenuActive();
  },
  {
    deep: true,
  }
);

const route = useRoute();

const isShow = ref<boolean>(true);
const screenWidth = ref<number>(0);
const screenWidthMobile = ref<number>(1280);
const menus = ref<any>([
  { name: "Home", icon: "fa-regular fa-house", to: "/" },
  { name: "Dashboard", icon: "fa-regular fa-rocket", to: "/dashboard" },
  {
    name: "UI",
    icon: "fa-sharp fa-regular fa-puzzle-piece",
    show: false,
    childs: [
      {
        name: "Component",
        icon: "fa-sharp fa-regular fa-sparkles",
        to: "/ui/component",
      },
    ],
  },
]);

const isMobile = computed(() => {
  return screenWidth.value <= screenWidthMobile.value;
});

watch(
  () => route.path,
  () => {
    checkMenuActive();
  },
  {
    deep: true,
  }
);

const initDate = () => {
  updateScreenWidth();
  window.addEventListener("resize", updateScreenWidth);
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
  isShow.value = isMobile.value ? false : true;
};

const checkMenuActive = () => {
  for (let i = 0; i < menus.value.length; i++) {
    const menu = menus.value[i];

    if (menu?.childs?.length) {
      let showMenu = false;
      for (let ii = 0; ii < menu.childs.length; ii++) {
        const child = menu.childs[ii];
        if (child.to === route.path) {
          showMenu = true;
        }
      }

      menu.show = showMenu;
    }
  }
};

const hiddenMenu = () => {
  isShow.value = false;
};


onMounted(() => {
  if (typeof window !== "undefined") {
    initDate();
  }

  checkMenuActive();
});

</script>
