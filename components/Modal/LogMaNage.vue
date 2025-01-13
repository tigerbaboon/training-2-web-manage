<template>
  <div class="flex justify-center relative">
    <div class="h-[820px]" v-if="props.show">
      <div
        class="absolute inset-1 bg-white shadow-lg bottom-[10px] w-[500px] rounded-lg flex justify-center p-2"
      >
        <diFv>
          <div class="text-[25px] mt-2">ประวัติการลงประกาศเช่า</div>
          <div class="text-[20px] mt-5">ชื่อโครงการ</div>
          <div
            class="border-solid border-[1px] border-black rounded-lg p-2 w-[400px]  text-center"
          >
            {{ props.datas.project }}
          </div>
          <div class="text-[20px] mt-5">ประเภทที่พัก</div>
          <div
            class="border-solid shadow-md border-[1px] border-black rounded-lg p-2 w-[400px]  text-center"
          >
            {{ props.datas.typeproject }}
          </div>
          <div class="text-[20px] mt-5">ประเภทการขาย</div>
          <div
            class="border-solid shadow-md border-[1px] border-black rounded-lg p-2 w-[400px] text-center"
          >
            {{ props.datas.typesell }}
          </div>
          <div class="text-[20px] mt-5">วันที่ลง</div>
          <div
            class="border-solid shadow-md border-[1px] border-black rounded-lg p-2 w-[400px] text-center"
          >
            {{ props.datas.date }}
          </div>
          <div class="text-[20px] mt-5">วันที่แก้ไขล่าสุด</div>
          <div
            class="border-solid shadow-md border-[1px] border-black rounded-lg p-2 w-[400px]  text-center"
          >
            {{ props.datas.correct }}
          </div>
          <div class="text-[20px] mt-5">คนที่ลง</div>
          <div
            class="border-solid shadow-md border-[1px] border-black rounded-lg p-2 w-[400px]  text-center"
          >
            {{ props.datas.newhome }}
          </div>
          <div class="text-[20px] mt-5">คนที่แก้ไข</div>
          <div
            class="border-solid shadow-md border-[1px] border-black rounded-lg p-2 w-[400px]  text-center"
          >
            {{ props.datas.edit }}
          </div>
       
          <div class="flex justify-end gap-3 mt-10">
            <button
              class="btn-confirm"
            >
              ตกลง
            </button>
            <button
              @click="hide"
              class="btn-cancel"
            >
              ยกเลิก
            </button>
          </div>
        </diFv>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Details {
  project: string;
  typeproject: string;
  typesell: string;
  date: string;
  correct: string;
  newhome: string;
  edit: string;
  dateedit: string;
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
