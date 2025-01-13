<template>
  <div class="w-full h-screen flex justify-end">
    <div class="flex flex-col w-full">
      <div class="bg-lime-300 h-[50px] flex items-center justify-between p-4">
        <div>
          <h1 class="text-black">Color {{ items?.name }}</h1>
        </div>
        <div
          class="bg-slate-300 border-sky-500 rounded-full p-2"
          @click="show = !show"
        >
          <button>{{ show ? "Show" : "Hide" }}</button>
        </div>
      </div>
      <div class="bg-white grow p-4">
        <div class="grid grid-cols-2 h-[800px] gap-2">
          <div :class="items?.text"></div>
          <div class="border-2"></div>
          <div class="border-2"></div>
          <div :class="items?.text"></div>
        </div>
      </div>
      <!-- img -->
      <div class="p-4 bg-gray-100 rounded shadow">
        <label class="block mb-2 text-gray-700">Upload Images:</label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          multiple
          class="hidden"
          @change="handleFiles"
          ref="fileInput"
        />
        <button
          @click="selectFiles"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Choose Images
        </button>

        <div v-if="previews.length" class="mt-4">
          <h3 class="font-bold text-gray-700">Image Previews:</h3>
          <div class="grid grid-cols-3 gap-4 mt-2">
            <div
              v-for="(preview, index) in previews"
              :key="index"
              class="relative"
            >
              <img
                :src="preview"
                alt="Preview Image"
                class="w-full h-auto rounded shadow mb-2"
              />
              <button
                @click="removeImage(index)"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                X
              </button>
              <p class="text-gray-600 text-sm">{{ labeledFiles[index] }}</p>
            </div>
          </div>
        </div>
        <button
          v-if="labeledFiles.length"
          @click="confirmUpload"
          class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ตกลง
        </button>
      </div>
    </div>

    <transition
      leave-active-class="transition duration-500 ease-in-out opacity-0 -translate-x-1"
    >
      <div class="w-[200px] bg-gray-300 p-1" v-if="show">
        <div v-for="color in colors" key="index" @click="items = color">
          <div
            class="grid grid-cols-1 p-3 m-1 border-2 text-white"
            :class="color.text"
          >
            {{ color.name }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const show = ref<boolean>(true);
const items = ref<any>();
const colors = ref<any>([
  {
    name: "Gray",
    text: "bg-gray-500",
  },
  {
    name: "Rose",
    text: "bg-rose-500",
  },
  {
    name: "Sky",
    text: "bg-sky-500",
  },
  {
    name: "Orange",
    text: "bg-orange-500",
  },
  {
    name: "Black",
    text: "bg-black",
  },
]);

// img start
const fileInput = ref<HTMLInputElement | null>(null);
const labeledFiles = ref<string[]>([]);
const previews = ref<string[]>([]);

const selectFiles = () => {
  fileInput.value?.click();
};

const handleFiles = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    previews.value.forEach((url) => URL.revokeObjectURL(url));
    labeledFiles.value = Array.from(files).map((file) => `${file.name}`);
    previews.value = Array.from(files).map((file) => URL.createObjectURL(file));
    console.log("Uploaded files:", labeledFiles.value);
  }
};


const removeImage = (index: number) => {
  URL.revokeObjectURL(previews.value[index]);
  
  labeledFiles.value.splice(index, 1);
  previews.value.splice(index, 1);
};
const confirmUpload = () => {
  console.log("Confirmed images:", labeledFiles.value);
};

onUnmounted(() => {
  previews.value.forEach((url) => URL.revokeObjectURL(url));
});
//end
</script>

<style></style>
