<template>
  <div class="h-screen w-[300px] bg-gray-300 grow">
    <div class="flex justify-center text-[25px]">กรอกข้อมูลที่พัก</div>
    <div class="mt-2">
      <div class="p-2">ประเภทการขาย</div>
      <div>
        <div class="flex justify-center">
          <select
            class="w-[280px] h-[30px] text-center"
            name="price"
            id="id-price"
          >
            <option value="เลือกราคา">เลือกประเภท</option>
            <option value="">บ้านเช่า</option>
            <option value="">ขายบ้าน</option>
          </select>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <div class="p-2">ประเภทที่พัก</div>
      <div>
        <div class="flex justify-center">
          <select
            class="w-[280px] h-[30px] text-center"
            name="price"
            id="id-price"
          >
            <option value="เลือกราคา">เลือกบ้านพัก</option>
            <option v-for="(value, x) in types" key="x">
              {{ value.nameadvert }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <div class="p-2">โซนที่พัก</div>
      <div>
        <div class="flex justify-center">
          <select
            class="w-[280px] h-[30px] text-center"
            name="price"
            id="id-price"
          >
            <option value="text">เลือกโซนที่พัก</option>
            <option v-for="(value, x) in zones" key="x">
              {{ value.namezone }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <div class="p-2">ชื่อโครงการ</div>
      <div>
        <div class="flex justify-center">
          <input
            class="text-black text-center w-[280px] h-[30px] bg-white border border-gray-300"
            type="text"
            placeholder="ระบุชื่อโครงการ"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center gap-5 mt-2 justify-center">
        <div class="mt-2">
          <div>พื้นที่ใช้สอย (ตร.ม.)</div>
            <input
              class="text-black text-center w-[120px] h-[30px] bg-white border border-gray-300"
              type="number"
              placeholder="0"
            />
        </div>
      <div class="mt-2">
        <div>ชั้น</div>
          <input
            class="text-black text-center w-[120px] h-[30px] bg-white border border-gray-300"
            type="text"
            placeholder="โปรดกรอกชั้น"
          />
      </div>
    </div>
    <div class="flex items-center gap-5 mt-2 justify-center">
        <div class="mt-2">
          <div>จำนวนห้องนอน</div>
            <input
              class="text-black text-center w-[120px] h-[30px] bg-white border border-gray-300"
              type="number"
              placeholder="ระบุ"
            />
        </div>
      <div class="mt-2">
        <div>จำนวนห้องน้ำ</div>
          <input
            class="text-black text-center w-[120px] h-[30px] bg-white border border-gray-300"
            type="text"
            placeholder="ระบุ"
          />
      </div>
    </div>
    <div class="flex items-center gap-5 mt-2 justify-center">
        <div class="mt-2">
          <div>อัตราค่าน้ำ (บาท)</div>
            <input
              class="text-black text-center w-[120px] h-[30px] bg-white border border-gray-300"
              type="number"
              placeholder="ระบุ"
            />
        </div>
      <div class="mt-2">
        <div>อัตราค่าไฟ (บาท)</div>
          <input
            class="text-black text-center w-[120px] h-[30px] bg-white border border-gray-300"
            type="text"
            placeholder="ระบุ"
          />
      </div>
    </div>
    <div class="mt-2">
      <div class="p-2">การแนำนำบ้านพัก</div>
      <div>
        <div class="flex justify-center">
          <select
            class="w-[280px] h-[30px] text-center"
            name="price"
            id="id-price"
          >
            <option value="เลือกราคา">ระบุ</option>
            <option value="เลือกราคา">1 เดือน  300 บาท</option>
            <option value="เลือกราคา">6 เดือน  500 บาท</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
});

interface Type {
  nameadvert: string;
  status: boolean;
}

const types = ref<Type[]>([
  {
    nameadvert: "บ้านเดี่ยว",
    status: true,
  },
  {
    nameadvert: "ห้องแถว",
    status: true,
  },
  {
    nameadvert: "คอนโด",
    status: true,
  },
  {
    nameadvert: "หมู่บ้านจัดสรร",
    status: true,
  },
  {
    nameadvert: "หอพัก",
    status: true,
  },
]);

interface zone {
  namezone: string;
  status: boolean;
}

const zones = ref<zone[]>([
  {
    namezone: "มอขอ",
    status: true,
  },
  {
    namezone: "กังสดาล",
    status: true,
  },
  {
    namezone: "มอภาค",
    status: true,
  },
  {
    namezone: "บึงแก่นนคร",
    status: true,
  },
  {
    namezone: "ต้นตาล",
    status: true,
  },
]);
</script>
