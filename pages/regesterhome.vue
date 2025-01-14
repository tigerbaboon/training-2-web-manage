<template>
  <div
    class="flex justify-center w-full mt-1"
    v-for="(list, x) in lists"
    :key="x"
  >
    <div class="md:flex w-full md:w-[1600px]">
      <div class="w-full md:w-[500px] border-x shadow-lg">
        <div class="grid grid-cols-2">
          <div
            @click="switchTab('fromDetail')"
            :class="{
              'bg-blue-500 text-white shadow-md': activeTab === 'fromDetail',
              'bg-gray-100 text-gray-700 hover:bg-gray-200':
                activeTab !== 'fromDetail',
            }"
            class="h-[40px] md:h-[60px] cursor-pointer flex items-center justify-center px-4 rounded-lg transition-colors duration-200"
          >
            ข้อมูล
          </div>
          <div
            @click="switchTab('inputImage')"
            :class="{
              'bg-blue-500 text-white shadow-md': activeTab === 'inputImage',
              'bg-gray-100 text-gray-700 hover:bg-gray-200':
                activeTab !== 'inputImage',
            }"
            class="h-[40px] md:h-[60px] cursor-pointer flex items-center justify-center px-4 rounded-lg transition-colors duration-200"
          >
            รูปภาพ
          </div>
          <!-- <div @click="switchTab('inputMap')" :class="{
            'bg-blue-500 text-white shadow-md': activeTab === 'inputMap',
            'bg-gray-100 text-gray-700 hover:bg-gray-200': activeTab !== 'inputMap',
          }"
            class="h-[40px] md:h-[60px] cursor-pointer flex items-center justify-center px-4 rounded-lg transition-colors duration-200">
            แผนที่
          </div> -->
        </div>
        <!-- ปุ่มส่งข้อมูลประกาศลงบ้าน -->
        <div
          class="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white text-[16px] md:text-[18px] font-semibold py-3 px-5 mx-4 mt-4 rounded-lg shadow-lg cursor-pointer transition-transform duration-600"
          @click="onSubmit"
        >
          <Icon name="tabler:send" class="w-[20px] h-[20px]" />
          <span>ส่งข้อมูลลงประกาศ</span>
        </div>
        <div class="w-full flex justify-center">
          <!-- กรองข้อมูลที่พัก -->
          <div class="w-full" v-if="activeTab === 'fromDetail'">
            <h1
              class="text-[22px] md:text-[30px] text-center py-2 font-bold text-gray-800"
            >
              กรอกข้อมูลที่พัก
            </h1>
            <div class="space-y-3 grid grid-cols-1 mx-4 mb-3">
              <div>
                <label
                  for="ชื่อโครงการ"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >ชื่อโครงการ</label
                >
                <input
                  id="ชื่อโครงการ"
                  type="text"
                  v-model="house_name"
                  placeholder="ระบุชื่อโครงการ..."
                  class="w-full h-[40px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                />
              </div>
              <div>
                <label
                  for="ประเภทการขาย"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >ประเภทการขาย</label
                >
                <select
                  v-model="sell_type"
                  id="ประเภทการขาย"
                  class="w-full h-[40px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                >
                  <option disabled value="">กรุณาเลือกประเภทการขาย</option>
                  <option
                    v-for="(categoryItem, i) in list.category"
                    :key="i"
                    class="text-black"
                  >
                    {{ categoryItem.sell }}
                  </option>
                </select>
              </div>

              <div>
                <label
                  for="ประเภทที่พัก"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >ประเภทที่พัก</label
                >
                <select
                  id="ประเภทที่พัก"
                  v-model="house_type"
                  class="w-full h-[40px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                >
                  <option disabled value="">กรุณาเลือกประเภทที่พัก</option>
                  <option
                    v-for="(categoryItem, i) in list.categoryhome"
                    :key="i"
                    :value="categoryItem.homelist"
                    class="text-black"
                  >
                    {{ categoryItem.homelist }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  for="โซนที่พัก"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >โซนที่พัก</label
                >
                <select
                  id="โซนที่พัก"
                  v-model="zone_id"
                  class="w-full h-[40px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                >
                  <option
                    v-for="(zone, i) in itemsZone"
                    :key="i"
                    :value="i"
                    class="text-black"
                  >
                    {{ zone.zone_name }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  for="ชื่อโครงการ"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >ราคา</label
                >
                <input
                  id="ราคา"
                  type="number"
                  min="0"
                  v-model="price"
                  placeholder="ราคาเช่าต่อเดือน"
                  class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                />
              </div>
              <div class="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                <div class="">
                  <label
                    for="พื้นที่ใช้สอย (ตร.ม.)"
                    class="block text-gray-900 md:text-[18px] text-[16px]"
                    >พื้นที่ใช้สอย(ตร.ม.)</label
                  >
                  <input
                    id="พื้นที่ใช้สอย (ตร.ม.)"
                    v-model="size"
                    type="number"
                    min="0"
                    placeholder="ตร.ม."
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <div>
                  <label
                    for="ชั้น"
                    class="block text-gray-900 md:text-[18px] text-[16px]"
                    >ชั้น</label
                  >
                  <input
                    id="ชั้น"
                    v-model="floor"
                    type="number"
                    min="0"
                    placeholder="จำนวนชัั้น"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <div class="">
                  <label
                    for="จำนวนห้องนอน"
                    class="block text-gray-900 md:text-[18px] text-[16px]"
                    >จำนวนห้องนอน</label
                  >
                  <input
                    id="จำนวนห้องนอน (ตร.ม.)"
                    v-model="number_of_rooms"
                    type="number"
                    min="0"
                    placeholder="ระบุจำนวนห้อง"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <div>
                  <label
                    for="จำนวนห้องน้ำ"
                    class="block text-gray-900 md:text-[18px] text-[16px]"
                    >จำนวนห้องน้ำ</label
                  >
                  <input
                    id="จำนวนห้องน้ำ"
                    v-model="number_of_bathrooms"
                    type="number"
                    placeholder="จำนวนห้องนอน"
                    min="0"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <!-- <div>
                  <label for="การแนะนำบ้านพัก"
                    class="block text-gray-900 xl:text-[18px] lg:text-[16px]">การแนะนำบ้านพัก</label>
                  <input id="การแนะนำบ้านพัก" type="text" placeholder="......" min="0"
                    class="w-full xl:h-[40px] lg:h-[32px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 xl:text-[20px] lg:text-[16px] px-2" />
                </div> -->
              </div>
              <div>
                <label
                  for="product_details"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >รายละเอียดบ้านเช่า</label
                >
                <textarea
                  placeholder="ใส่ข้อมูลบ้านเช่าของคุณ"
                  v-model="description"
                  class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  id="product_details"
                ></textarea>
              </div>
              <div>
                <label
                  for="address"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >ที่อยู่</label
                >
                <textarea
                  placeholder="ใส่ที่อยู่บ้านเช่าของคุณ"
                  v-model="address"
                  class="w-full h-[90px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  id="address"
                ></textarea>
              </div>
              <div class="grid grid-cols-2 gap-x-4 w-full">
                <div>
                  <label
                    for="อัตราค่าไฟ บาท/ต่อหน่วย"
                    class="block text-gray-900 md:text-[18px] text-[16px]"
                    >อัตราค่าไฟ บาท/ต่อหน่วย</label
                  >
                  <input
                    id="อัตราค่าไฟ บาท/ต่อหน่วย"
                    v-model="electricity_rate"
                    type="number"
                    min="0"
                    placeholder="ระบุค่าไฟ"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <div class="">
                  <label
                    for="อัตราค่าน้ำ บาท/ต่อหน่วย"
                    class="block text-gray-900 md:text-[18px] text-[16px]"
                    >อัตราค่าน้ำ บาท/ต่อหน่วย</label
                  >
                  <input
                    id="อัตราค่าน้ำ บาท/ต่อหน่วย"
                    v-model="water_rate"
                    type="number"
                    min="0"
                    placeholder="ระบุค่าน้ำ"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
              </div>
              <div class="w-full">
                <label
                  for="#"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >สิ่งอำนวยความสะดวก</label
                >
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div v-for="(device, i) in itemsDetail" :key="i">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        v-model="item_detail"
                        :value="device.id"
                        class="appearance-none w-6 h-6 border-2 border-gray-300 rounded-md checked:border-[#00aeef] relative"
                      />
                      <label for="checkboxdevice" class="ml-2 text-gray-700">{{
                        device.amenity_name
                      }}</label>
                    </div>
                    <!-- <input v-model="selectedDevices" type="checkbox" id="#" :value="device.select"
                                    class="appearance-none w-6 h-6 border-2 border-orange-500 rounded-sm checked:bg-orange-500 checked:border-orange-500 focus:ring-0 focus:outline-none">
                                {{ device.select }} -->
                  </div>
                </div>
              </div>

              <div class="w-full">
                <label
                  for="name"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >ชื่อผู้ลงประกาศ</label
                >
                <input
                  id="name"
                  type="text"
                  v-model="first_name"
                  placeholder="ชื่อ"
                  class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                />
              </div>
              <div class="w-full">
                <label
                  for="name"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >นามสกุลผู้ลงประกาศ</label
                >
                <input
                  id="name"
                  type="text"
                  v-model="last_name"
                  placeholder="นามสกุล"
                  class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                />
              </div>
              <div class="grid grid-cols-1 gap-y-3 w-full">
                <!-- <div>
                  <label
                    for="homenumber"
                    class="block text-gray-900 xl:text-[18px] lg:text-[14px]"
                    >บ้านเลขที่</label
                  >
                  <input
                    id="homenumber"
                    type="text"
                    placeholder="โปรดระบุ"
                    class="w-full xl:h-[40px] lg:h-[32px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[20px] px-2"
                  />
                </div> -->
                <!-- <div class="">
                  <label
                    class="block text-gray-900 xl:text-[18px] lg:text-[14px]"
                    >เลขที่ห้อง</label
                  >
                  <input
                    type="text"
                    placeholder="โปรดระบุ"
                    class="w-full xl:h-[40px] lg:h-[32px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[20px] px-2"
                  />
                </div> -->
                <div>
                  <label
                    for="phone"
                    class="block text-gray-900 text-[18px] md:text-[24px]"
                    >เบอร์ติดต่อ</label
                  >
                  <input
                    id="phone"
                    type="text"
                    v-model="phone_number"
                    placeholder="โปรดระบุ"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <div class="">
                  <label
                    for="lineid"
                    class="block text-gray-900 text-[18px] md:text-[24px]"
                    >Line ID</label
                  >
                  <input
                    id="lineid"
                    type="text"
                    v-model="line_id"
                    placeholder="โปรดระบุ"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- อัพโหลดรูป -->
          <div
            class="w-full md:flex md:flex-col"
            v-if="activeTab === 'inputImage'"
          >
            <h1
              class="text-[22px] md:text-[30px] text-center py-2 font-bold text-gray-800"
            >
              อัพโหลดรูปภาพ
            </h1>
            <div class="w-full flex md:block px-2">
              <div
                class="w-full md:w-auto border-[2px] border-sky-400 rounded-md md:p-6 m-2"
              >
                <p class="text-[16px] md:text-[24px] text-center">
                  อัพโหลดรูปหน้าปก
                </p>
                <label
                  class="cursor-pointer relative group md:border-2 md:border-dashed md:border-gray-700 rounded-lg p-1 md:p-4 flex flex-col items-center justify-center hover:border-sky-400 transition-all"
                >
                  <input
                    class="text-sm cursor-pointer hidden"
                    type="file"
                    multiple
                    @change="handleSingleImageUpload"
                  />
                  <div
                    class="hidden md:block absolute top-2 left-2 bg-sky-400 text-white px-2 py-1 rounded-tr-lg"
                  >
                    รูปหน้าปก
                  </div>
                  <Icon
                    class="w-[25px] md:w-[50px] h-[25px] md:h-[50px] group-hover:text-sky-400 transition-all text-gray-500"
                    name="fluent:image-add-32-light"
                  />
                  <p class="text-gray-500 mt-2">เพิ่มรูป</p>
                  <p class="hidden md:block text-xs text-gray-600">
                    (ไฟล์ jpg, png)
                  </p>
                </label>
              </div>
              <div
                class="w-full md:w-auto border-[2px] border-green-400 rounded-md md:p-6 m-2"
              >
                <p class="text-[16px] md:text-[24px] text-center">
                  อัพโหลดรูปประกอบ
                </p>
                <label
                  class="cursor-pointer relative group md:border-2 md:border-dashed md:border-gray-700 rounded-lg p-1 md:p-4 flex flex-col items-center justify-center hover:border-green-400 transition-all"
                >
                  <input
                    class="text-sm cursor-pointer hidden"
                    type="file"
                    multiple
                    @change="handleSingleImageUpload2"
                  />
                  <div
                    class="hidden md:block absolute top-2 left-2 bg-green-400 text-white px-2 py-1 rounded-tr-lg"
                  >
                    รูปประกอบ
                  </div>
                  <Icon
                    class="w-[25px] md:w-[50px] h-[25px] md:h-[50px] group-hover:text-green-400 transition-all text-gray-500"
                    name="fluent:image-add-32-light"
                  />
                  <p class="text-gray-500 mt-2">เพิ่มรูป</p>
                  <p class="hidden md:block text-xs text-gray-600">
                    (ไฟล์ jpg, png)
                  </p>
                </label>
              </div>
            </div>
          </div>
          <!-- ใส่ข้อมูลแผนที่ -->
          <!-- <div class="w-full " v-if="activeTab === 'inputMap'">
            <h1 class="text-[22px] md:text-[30px] text-center py-2 font-bold text-gray-800">
              ที่ตั้งที่พักของคุณ
            </h1>
            <div class="space-y-3 grid grid-cols-1 mx-4 mb-3">
              <div class="grid grid-cols-1 gap-x-4">
                <div>
                  <label for="latitudeInput" class="block text-gray-900 text-[18px] md:text-[24px]">ละติจูด</label>
                  <input id="latitudeInput" v-model="location_latitute" type="number" placeholder="ตำแหน่งละติจูด"
                    class="w-full h-[40px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2" />
                </div>
                <div>
                  <label for="longitudeInput" class="block text-gray-900 text-[18px] md:text-[24px]">ลองติจูด</label>
                  <input id="longitudeInput" v-model="location_longitute" type="number" placeholder="ตำแหน่งลองติจูด"
                    class="w-full h-[40px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2" />
                </div>
              </div>
              <div class="w-full flex justify-end">
                <div class="flex gap-3 md:gap-5 pt-2">
                  <button
                    class="md:w-[120px] w-[100px] h-[40px] bg-green-500 content-center text-center text-[16px] md:text-[18px] text-white rounded-md shadow-lg"
                    @click="updateMap">
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <!-- แสดงรายละเอียดต่างๆที่ใส่ใน input -->
      <div class="w-full bg-white mt-3 md:mt-0">
        <p class="text-[18px] md:text-[24px] font-bold text-center p-3">
          รายละเอียดข้อมูลลงประกาศของคุณ
        </p>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg">
          <div>
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >ชื่อบ้านเช่า :</span
            >
            <span
              class="font-bold text-[18px] md:text-[30px] break-words whitespace-normal block max-w-full"
              style="
                word-wrap: break-word;
                overflow-wrap: anywhere;
                overflow: hidden;
              "
            >
              {{ house_name }}
            </span>
          </div>
          <div>
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >ประเภทการขาย :
            </span>
            <span class="font-bold text-[18px] md:text-[30px] break-words">{{
              sell_type
            }}</span>
          </div>
          <div>
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >ประเภทที่พัก :
            </span>
            <span class="font-bold text-[18px] md:text-[30px] break-words">{{
              house_type
            }}</span>
          </div>
          <div>
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >โซนที่พัก :
            </span>
            <span class="font-bold text-[18px] md:text-[30px] break-words">
              {{
                zone_id !== null && itemsZone
                  ? itemsZone[zone_id]?.zone_name
                  : ""
              }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >ราคาเช่า :
            </span>
            <span class="font-bold xl:text-[28px] lg:text-[22px]"
              >{{ price }}
            </span>
            <div>
              <span
                v-if="sell_type === 'เช่า'"
                class="text-gray-800 text-[16px] md:text-[24px]"
              >
                บาท/เดือน
              </span>
              <span
                v-else-if="sell_type === 'ขาย'"
                class="text-gray-800 text-[16px] md:text-[24px]"
              >
                บาท
              </span>
            </div>
          </div>
        </div>
        <!-- เเสดงรูปที่ต้องการอัพโหลด -->
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <p class="text-[16px] md:text-[24px] py-3">รูปภาพ</p>
          <div
            class="md:flex md:justify-center grid grid-cols-1 gap-1 md:gap-2 md:h-[408px]"
          >
            <div v-if="uploadedImages.length" class="md:w-[710px] relative">
              <button
                @click="delimg()"
                class="absolute top-1 right-2 text-rose-600 hover:text-red-500"
              >
                <Icon class="w-[30px] h-[30px]" name="mdi:close-thick" />
              </button>
              <span
                class="absolute top-2 left-2 text-white bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-1.5 rounded-[4px] shadow-md text-sm font-semibold"
              >
                รูปหน้าปก
              </span>
              <div class="w-full h-[200px] md:h-[408px]">
                <img
                  class="w-full h-full rounded-lg object-cover"
                  :src="uploadedImages[0]"
                  alt="Uploaded"
                />
              </div>
            </div>
            <!-- รูปโชว์ตอนยังไม่ได้เลือกไฟล์รูป -->
            <div
              v-if="!uploadedImages.length"
              class="w-full md:w-[710px] md:h-[408px] h-[200px] relative"
            >
              <div
                class="w-full md:w-[700px] md:h-[400px] flex justify-center items-center"
              >
                <div
                  class="flex flex-col items-center justify-center md:w-[700px] w-full h-[200px] md:h-[400px] border-[2px] border-gray-500 rounded-xl border-dashed"
                >
                  <Icon
                    class="w-[100px] h-[100px] text-gray-500"
                    name="fa-regular:images"
                  />
                  <p class="text-[30px] text-gray-500 font-bold">No images</p>
                </div>
                <span
                  class="absolute top-2 left-2 text-white bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-1.5 rounded-[4px] shadow-md text-sm font-semibold"
                >
                  รูปหน้าปก
                </span>
              </div>
            </div>
            <div
              class="grid grid-cols-1 gap-1 overflow-auto overflow-x-hidden h-[408px]"
            >
              <div
                v-if="uploadedImages2.length"
                v-for="(uploadedImages2, index) in uploadedImages2.slice(0)"
                :key="index"
                class="relative"
              >
                <button
                  @click="delimg2(index)"
                  class="absolute top-1 right-2 text-rose-600 hover:text-red-500"
                >
                  <Icon class="w-[20px] h-[20px]" name="mdi:close-thick" />
                </button>
                <span
                  class="absolute top-2 left-2 text-[12px] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-2 py-1 rounded-[4px] shadow-md font-semibold"
                >
                  รูปประกอบ
                </span>
                <div class="w-full md:w-[370px] h-[200px] md:h-[200px]">
                  <img
                    class="w-full h-full rounded-lg object-cover"
                    :src="uploadedImages2"
                    alt="Uploaded"
                  />
                </div>
              </div>
              <!-- รูปโชว์ตอนยังไม่ได้เลือกไฟล์รูป -->
              <div v-else class="w-full md:w-[380px] grid grid-cols-1 gap-1">
                <div
                  class="w-full xl:h-[196px] lg:h-[358px] flex justify-center items-center border-[2px] border-gray-500 rounded-xl border-dashed relative"
                >
                  <div class="flex flex-col items-center">
                    <Icon
                      class="w-[100px] h-[100px] text-gray-500"
                      name="fa-regular:images"
                    />
                    <p class="text-[30px] text-gray-500 font-bold">No images</p>
                  </div>
                  <span
                    class="absolute top-2 left-2 text-[12px] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-2 py-1 rounded-[4px] shadow-md font-semibold"
                  >
                    รูปประกอบ
                  </span>
                </div>
                <div
                  class="w-full xl:h-[196px] lg:h-[358px] flex justify-center items-center border-[2px] border-gray-500 rounded-xl border-dashed relative"
                >
                  <div class="flex flex-col items-center">
                    <Icon
                      class="w-[100px] h-[100px] text-gray-500"
                      name="fa-regular:images"
                    />
                    <p class="text-[30px] text-gray-500 font-bold">No images</p>
                    <span
                      class="absolute top-2 left-2 text-[12px] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-2 py-1 rounded-[4px] shadow-md font-semibold"
                    >
                      รูปประกอบ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <p class="text-[16px] md:text-[24px]">ข้อมูลที่พัก</p>
          <div class="grid grid-cols-2 md:grid-cols-4 place-items-start">
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="ion:bed-outline"
              />
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ number_of_rooms }}
              </p>
              <p class="text-[16px] md:text-[24px]">ห้องนอน</p>
            </div>
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="mdi:bathroom"
              />
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ number_of_bathrooms }}
              </p>
              <p class="text-[16px] md:text-[24px]">ห้องน้ำ</p>
            </div>
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="ri:stairs-line"
              />
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ floor }}
              </p>
              <p class="text-[16px] md:text-[24px]">ชั้น</p>
            </div>
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="material-symbols-light:background-grid-small-outline"
              />
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ size }}
              </p>
              <p class="text-[16px] md:text-[24px]">ตร.ม.</p>
            </div>
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <p class="text-[16px] md:text-[24px]">อัตราค่าน้ำและค่าไฟ</p>
          <div class="grid grid-cols-1 md:grid-cols-2 place-items-start">
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="iconoir:light-bulb-on"
              />
              <span class="text-[16px] md:text-[24px]">ค่าไฟ</span>
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ electricity_rate }}
              </p>
              <p class="text-[16px] md:text-[24px]">บาท/ต่อหน่วย</p>
            </div>
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="healthicons:running-water-outline"
              />
              <span class="text-[16px] md:text-[24px]">ค่าน้ำ</span>
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ water_rate }}
              </p>
              <p class="text-[16px] md:text-[24px]">บาท/ต่อหน่วย</p>
            </div>
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <label for="inputtext" class="text-[16px] md:text-[24px]"
            >รายละเอียดบ้านเช่า :
          </label>
          <div
            :class="description == '' && 'hidden'"
            class="w-full h-auto text-[16px] md:text-[20px] p-2 border rounded-md break-words whitespace-pre-line"
            :v-html="formattedMessage"
          >
            {{ description }}
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <label for="inputaddress" class="text-[16px] md:text-[24px]"
            >ที่อยู่ :
          </label>
          <div
            :class="address == '' && 'hidden'"
            class="w-full h-auto text-[16px] md:text-[20px] p-2 border rounded-md break-words whitespace-pre-line"
            :v-html="formattedMessage"
          >
            {{ address }}
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <p class="text-[16px] md:text-[24px]">สิ่งอำนวยความสะดวก</p>
          <div
            class="grid grid-cols-2 md:grid-cols-4 gap-y-[1px] md:gap-y-3"
            v-if="item_detail.length"
          >
            <li
              class="text-[16px] md:text-[22px] custom-bullet"
              v-for="device in item_detail"
              :key="device"
            >
              &nbsp;{{
                item_detail !== null && device
                  ? itemsDetail.find((item) => item.id === device)?.amenity_name
                  : ""
              }}
            </li>
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <p class="text-[16px] md:text-[24px]">ที่ตั้ง :</p>
          <!-- <Googlemap class="w-full h-[250px] md:h-[450px]" :datas="g_modal" /> -->
          <div>
            <MarkMapApi @update:latLng="updateLatLng" />
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <p class="text-[16px] md:text-[24px]">ข้อมูลผู้ลงประกาศ</p>
          <div class="grid grid-cols-1 gap-2 my-1">
            <div class="flex items-center gap-1 md:gap-2">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="icon-park-solid:edit-name"
              />
              <p class="text-[14px] md:text-[24px]">
                ชื่อ :
                <span
                  class="text-[14px] md:text-[24px] text-[#2eb840] break-all whitespace-normal max-w-full"
                >
                  {{ first_name }}
                </span>
              </p>
            </div>
            <div class="flex items-center gap-1 md:gap-2">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="icon-park-solid:edit-name"
              />
              <p class="text-[14px] md:text-[24px]">
                นามสกุล :
                <span
                  class="text-[14px] md:text-[24px] text-[#2eb840] break-all whitespace-normal max-w-full"
                >
                  {{ last_name }}
                </span>
              </p>
            </div>
            <div class="flex items-center gap-1 md:gap-2">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="icon-park-outline:phone-call"
              />
              <p class="text-[14px] md:text-[24px]">
                เบอร์โทร :
                <span
                  class="text-[14px] md:text-[24px] text-[#2eb840] break-all whitespace-normal max-w-full"
                >
                  {{ phone_number }}
                </span>
              </p>
            </div>
            <div class="flex items-center gap-1 md:gap-2">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="ri:line-line"
              />
              <p class="text-[14px] md:text-[24px]">
                ID Line :
                <span
                  class="text-[14px] md:text-[24px] text-[#2eb840] break-all whitespace-normal max-w-full"
                >
                  {{ line_id }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="border rounded-md ml-10 my-3 shadow-lg h-[80px]">
          <p>การแนะนำบ้านพัก</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import service from "~/service";

import MarkMapApi from "@/components/MarkMapApi.vue";

definePageMeta({
  layout: "register",
  middleware: "auth",
});

// const zone_id = ref<any>(zones.id[0].zones.id);

const props = defineProps({
  datas: {
    type: Object,
    default: () => null,
  },
});

const emit = defineEmits(["update:latLng"]);
const router = useRouter();

const activeTab = ref<string>("fromDetail");
const house_name = ref<string>("");
const number_of_rooms = ref<number>(0);
const number_of_bathrooms = ref<number>(0);
const location_latitute = ref<number>(0);
const location_longitute = ref<number>(0);
const electricity_rate = ref<number>(0);
const water_rate = ref<number>(0);
const floor = ref<number>(0);
const size = ref<number>(0);
const zone_id = ref<number | null>(null);
const description = ref<string>("");
const house_type = ref<string>("");
const sell_type = ref<string>("");
const isLoading = ref<boolean>(false);
const address = ref<string>("");
const itemsZone = ref<any[]>([]);
const itemsDetail = ref<any[]>([]);
const item_detail = ref<string[]>([]);
const first_name = ref<string>("");
const last_name = ref<string>("");
const phone_number = ref<string>("");
const price = ref<number>(0);
const line_id = ref<string>("");
const lat = ref<number | null>(null);
const lng = ref<number | null>(null);

const updateLatLng = async (coords: { lat: number; lng: number }) => {
  lat.value = coords.lat;
  lng.value = coords.lng;
  console.log("updateLatLng", lat.value, lng.value);
};

const formattedMessage = computed(() => {
  return description.value.replace(/\n/g, "<br>");
});

const switchTab = (tab: string) => {
  activeTab.value = tab;
};

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const formdata: any = new FormData();
    formdata.append("house_name", house_name.value);
    formdata.append("house_type", house_type.value);
    if (zone_id.value !== null && itemsZone.value[zone_id.value]?.id) {
      formdata.append("zone_id", itemsZone.value[zone_id.value].id);
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาเลือกโซน",
      });
    }
    formdata.append("floor", floor.value);
    formdata.append("size", size.value);
    formdata.append("sell_type", sell_type.value);
    formdata.append("number_of_rooms", number_of_rooms.value);
    formdata.append("number_of_bathrooms", number_of_bathrooms.value);
    formdata.append("description", description.value);
    formdata.append("address", address.value);
    formdata.append("electricity_rate", electricity_rate.value);
    formdata.append("water_rate", water_rate.value);
    formdata.append("first_name", first_name.value);
    formdata.append("last_name", last_name.value);
    formdata.append("phone_number", phone_number.value);
    formdata.append("line_id", line_id.value);
    formdata.append("price", price.value);
    formdata.append("location_latitute", lat.value?.toString() || "");
    formdata.append("location_longitute", lng.value?.toString() || "");

    let amenity_id: string = "";
    for (let i = 0; i < item_detail.value.length; i++) {
      const result = item_detail.value[i];
      amenity_id += result;
      if (i < item_detail.value.length - 1) amenity_id += ",";
    }
    formdata.append("amenity_id", amenity_id);

    for (let i = 0; i < rawFiles.value.length; i++) {
      const file = rawFiles.value[i];
      formdata.append("image_main", file, file.name);
    }

    for (let i = 0; i < rawFiles2.value.length; i++) {
      const file = rawFiles2.value[i];
      formdata.append("image", file, file.name);
    }

    const resp: any = await service.regesterhome.createhome(formdata);
    console.log("resp", resp);
    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "ลงทะเบียนเรียบร้อย",
      });
      router.back();
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: error || "เกิดข้อผิดพลาด",
    });
  } finally {
    isLoading.value = false;
  }
};

const getitem = async () => {
  try {
    const resp: any = await service.zone.listzone(query.value);
    if (resp.Code == "200") {
      itemsZone.value = resp?.Data || [];
      let newDatas = [{ zone_name: "ทั้งหมด", id: "''" }];
      for (let index = 0; index < itemsZone.value.length; index++) {
        const rawDatas = itemsZone.value[index];
        newDatas.push({ zone_name: rawDatas.zone_name, id: rawDatas.id });
      }
      itemsZone.value = newDatas;
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

const getdetail = async () => {
  try {
    const resp: any = await service.regesterhome.listamenity(query.value);
    if (resp.Code == "200") {
      itemsDetail.value = resp?.Data || [];
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

const query = ref<string>("");
const lists = ref<any>([
  {
    head: [
      { title: "ข้อมูล", link: "" },
      { title: "รูปภาพ", link: "" },
      { title: "ยืนยันข้อมูล", link: "" },
    ],

    category: [{ sell: "ขาย" }, { sell: "เช่า" }],
    categoryhome: [
      { homelist: "บ้านพัก" },
      { homelist: "คอนโด" },
      { homelist: "บ้านเดียว" },
      { homelist: "บ้านแฝด" },
    ],
  },
]);

const uploadedImages = ref<string[]>([]);
const rawFiles = ref<any>([]);

const handleSingleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    rawFiles.value = files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        uploadedImages.value.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
};

const uploadedImages2 = ref<string[]>([]);
const rawFiles2 = ref<any>([]);

const handleSingleImageUpload2 = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    rawFiles2.value = files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        uploadedImages2.value.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
};

const removeImage = (index: number) => {
  uploadedImages2.value.splice(index, 1);
};
const delimg = () => {
  uploadedImages.value = [];
};
const delimg2 = (index: number) => {
  uploadedImages2.value.splice(index, 1);
};

//map

function updateMap(): void {
  const lat = (document.getElementById("latitudeInput") as HTMLInputElement)
    .value;
  const lng = (document.getElementById("longitudeInput") as HTMLInputElement)
    .value;

  g_modal.value.location_latitute = parseFloat(lat);
  g_modal.value.location_longitute = parseFloat(lng);
}

onMounted(() => {
  getitem();
  getdetail();
});

interface g_Modal {
  location_latitute: number;
  location_longitute: number;
}

const g_modal = ref<g_Modal>({
  location_latitute: 0,
  location_longitute: 0,
});
</script>

<style scope>
input[type="checkbox"]:checked::after {
  content: "◉";
  position: absolute;
  right: 2.5px;
  bottom: -4px;
  font-size: 20px;
  color: #00aeef;
}

.custom-bullet::marker {
  content: "★";
  /* ใช้สัญลักษณ์อื่นแทนจุดกลม */
  color: #00aeef;
  /* กำหนดสีของ bullet */
  font-size: 22px;
  /* กำหนดขนาดของ bullet */
}
</style>
