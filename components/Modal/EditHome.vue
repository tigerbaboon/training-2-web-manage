<template>
    <div class="flex justify-center  relative">
      <div class="h-[300px]" v-if="props.show">
        <div
          class=" absolute inset-1 bg-white shadow-lg bottom-[10px] w-[500px] rounded-lg flex justify-center items-center p-2"
        >
          <div>
            <input
              class="border-solid border-[1px] shadow-md border-black rounded-lg p-2 w-[400px] mt-5 text-center" v-model="props.datas.project"
            >
            <div class="flex gap-4">
              <input
                class="border-solid border-[1px] shadow-md border-black rounded-lg p-2 w-[192px] mt-5 " v-model="props.datas.typeproject"
              >
              <input
                class="border-solid border-[1px] shadow-md border-black rounded-lg p-2 w-[190px] mt-5" v-model="props.datas.typesell"
              >
            </div>
            <div class="flex gap-4">
              <input
                class="border-solid border-[1px] shadow-md border-black rounded-lg p-2 w-[192px] mt-5 " v-model="props.datas.edit"
              >
              <input
                class="border-solid border-[1px] shadow-md border-black rounded-lg p-2 w-[190px] mt-5" v-model="props.datas.correct"
              >
               
            </div>
            <div class="flex  justify-end gap-3 mt-10 ">
                <button
                  class=" bg-green-500 text-white rounded-lg w-[60px] h-[30px] flex justify-center items-center"
                >
                  ตกลง
                </button>
                <button
                  @click="hide"
                  class="  bg-red-500 text-white rounded-lg w-[60px] h-[30px] flex justify-center items-center"
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

  interface Details {
  project: string;
  typeproject: string;
  typesell: string;
  edit: string;
  correct: string;
  }
  
  const props = defineProps<{
    show: Boolean;
    datas: Details;
  }>();
  
  const emit = defineEmits(["close"]);
  const hide = () => {
    emit("close");
  };
  </script>
  
  <style scoped></style>
  