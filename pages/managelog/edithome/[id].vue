<template>
  <div class="flex justify-center w-full" v-for="(list, x) in lists" :key="x">
    <div class="md:flex w-full md:w-[1600px]">
      <div class="w-full md:w-[500px] border-x shadow-lg">
        <div class="grid grid-cols-2 mt-3">
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
          <!-- <div
            @click="switchTab('inputMap')"
            :class="{
              'bg-blue-500 text-white shadow-md': activeTab === 'inputMap',
              'bg-gray-100 text-gray-700 hover:bg-gray-200':
                activeTab !== 'inputMap',
            }"
            class="h-[40px] md:h-[60px] cursor-pointer flex items-center justify-center px-4 rounded-lg transition-colors duration-200"
          >
            แผนที่
          </div> -->
        </div>
        <!-- ปุ่มส่งข้อมูลประกาศลงบ้าน -->
        <div
          class="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 hover:from-yellow-500 hover:to-yellow-600 text-white text-[16px] md:text-[18px] font-semibold py-3 px-5 mx-4 mt-4 rounded-lg shadow-lg cursor-pointer transition-transform duration-600"
          @click="updateByHome(route.params.id as string)"
        >
          <Icon name="bx:edit" class="text-gray-800 w-[20px] h-[20px]" />
          <span class="text-gray-800">แก้ไขข้อมูลลงประกาศ</span>
        </div>
        <div
          v-if="!getHouse.loading"
          class="w-full flex justify-center md:px-2"
        >
          <!-- กรองข้อมูลที่พัก -->
          <div class="w-full md:py-6" v-if="activeTab === 'fromDetail'">
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
                  v-model="getHouse.datas.house_name"
                  placeholder="ระบุชื่อโครงการ..."
                  class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                />
              </div>
              <div>
                <label
                  for="ประเภทการขาย"
                  class="block text-gray-900 text-[18px] md:text-[24px]"
                  >ประเภทการขาย</label
                >
                <select
                  v-model="getHouse.datas.sell_type"
                  id="ประเภทการขาย"
                  class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                >
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
                  v-model="getHouse.datas.house_type"
                  class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                >
                  <option
                    v-for="(categoryItems, i) in list.categoryhome"
                    :key="i"
                    class="text-black"
                  >
                    {{ categoryItems.homelist }}
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
                  v-model="getHouse.datas.zone"
                  class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                >
                  <option
                    v-for="(zone, i) in itemsZone"
                    :key="i"
                    :value="zone"
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
                  v-model="getHouse.datas.price"
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
                    v-model="getHouse.datas.size"
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
                    v-model="getHouse.datas.floor"
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
                    v-model="getHouse.datas.number_of_rooms"
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
                    v-model="getHouse.datas.number_of_bathrooms"
                    type="number"
                    placeholder="จำนวนห้องนอน"
                    min="0"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <!-- <div>
                  <label for="การแนะนำบ้านพัก"
                    class="block text-gray-900 md:text-[18px] text-[16px]">การแนะนำบ้านพัก</label>
                  <input id="การแนะนำบ้านพัก" type="text" placeholder="......" min="0"
                    class="w-full  h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2" />
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
                  v-model="getHouse.datas.description"
                  class="w-full h-[250px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 xl:text-[18px] px-2"
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
                  v-model="getHouse.datas.address"
                  class="w-full h-[90px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  id="address"
                ></textarea>
              </div>
              <div class="grid grid-cols-2 gap-x-4 w-full">
                <div>
                  <label
                    for="อัตราค่าไฟ บาท/ต่อหน่วย"
                    class="block text-gray-900 xl:text-[16px] lg:text-[14px]"
                    >อัตราค่าไฟ บาท/ต่อหน่วย</label
                  >
                  <input
                    id="อัตราค่าไฟ บาท/ต่อหน่วย"
                    v-model="getHouse.datas.electricity_rate"
                    type="number"
                    min="0"
                    placeholder="ระบุค่าไฟ"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <div class="">
                  <label
                    for="อัตราค่าน้ำ บาท/ต่อหน่วย"
                    class="block text-gray-900 xl:text-[16px] lg:text-[14px]"
                    >อัตราค่าน้ำ บาท/ต่อหน่วย</label
                  >
                  <input
                    id="อัตราค่าน้ำ บาท/ต่อหน่วย"
                    v-model="getHouse.datas.water_rate"
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
                        v-model="newArray"
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
                  class="block text-gray-900 xl:text-[24px] lg:text-[18px]"
                  >ชื่อผู้ลงประกาศ</label
                >
                <input
                  id="name"
                  type="text"
                  v-model="getHouse.datas.contact_info.first_name"
                  placeholder="ชื่อ"
                  class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                />
              </div>
              <div class="w-full">
                <label
                  for="name"
                  class="block text-gray-900 xl:text-[24px] lg:text-[18px]"
                  >นามสกุลผู้ลงประกาศ</label
                >
                <input
                  id="name"
                  type="text"
                  v-model="getHouse.datas.contact_info.last_name"
                  placeholder="ชื่อ"
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
                    class="block text-gray-900 xl:text-[18px] lg:text-[14px]"
                    >เบอร์ติดต่อ</label
                  >
                  <input
                    id="phone"
                    type="text"
                    v-model="getHouse.datas.contact_info.phone_number"
                    placeholder="โปรดระบุ"
                    class="w-full h-[40px] shadow-lg outline-sky-200 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <div class="">
                  <label
                    for="lineid"
                    class="block text-gray-900 xl:text-[18px] lg:text-[14px]"
                    >Line ID</label
                  >
                  <input
                    id="lineid"
                    type="text"
                    v-model="getHouse.datas.contact_info.line_id"
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
                  อัพโหลดรูปประกอบเพิ่มเติม
                </p>
                <label
                  class="cursor-pointer relative group md:border-2 md:border-dashed md:border-gray-700 rounded-lg p-1 md:p-4 flex flex-col items-center justify-center hover:border-green-400 transition-all"
                >
                  <input
                    class="text-sm cursor-pointer hidden"
                    type="file"
                    multiple
                    @change="handleMultipleImageUpload3"
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
          <!-- <div class="w-full" v-if="activeTab === 'inputMap'">
            <h1
              class="text-[22px] md:text-[30px] text-center py-2 font-bold text-gray-800"
            >
              ที่ตั้งที่พักของคุณ
            </h1>
            <div class="space-y-3 grid grid-cols-1 mx-4 mb-3">
              <div class="grid grid-cols-1 gap-x-4">
                <div>
                  <label
                    for="latitudeInput"
                    class="block text-gray-900 text-[18px] md:text-[24px]"
                    >ละติจูด</label
                  >
                  <input
                    id="latitudeInput"
                    v-model="getHouse.datas.location_latitute"
                    type="number"
                    placeholder="ตำแหน่งละติจูด"
                    class="w-full h-[40px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
                <div>
                  <label
                    for="longitudeInput"
                    class="block text-gray-900 text-[18px] md:text-[24px]"
                    >ลองติจูด</label
                  >
                  <input
                    id="longitudeInput"
                    v-model="getHouse.datas.location_longitute"
                    type="number"
                    placeholder="ตำแหน่งลองติจูด"
                    class="w-full h-[40px] shadow-lg outline-sky-300 border-[1px] rounded-md border-gray-200 text-[16px] md:text-[20px] px-2"
                  />
                </div>
              </div>
              <div class="w-full flex justify-end">
                <div class="flex gap-3 md:gap-5 pt-2">
                  <button
                  class="xl:w-[110px] lg:w-[70px] xl:h-[35px] lg:h-[28px] bg-red-500 content-center text-center lg:text-[14px] text-white rounded-md shadow-lg">
                  ยกเลิก
                </button>
                  <button
                    class="md:w-[120px] w-[100px] h-[40px] bg-green-500 content-center text-center text-[16px] md:text-[18px] text-white rounded-md shadow-lg"
                    @click="updateMap"
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div v-else class="flex justify-center items-center text-[30px] gap-3">
          <Icon
            class="xl:w-[100px] lg:w-[50px] xl:h-[100px] lg:h-[50px] text-gray-500"
            name="line-md:loading-loop"
          />
          กรุณารอสักครู่
        </div>
      </div>
      <!-- แสดงรายละเอียดต่างๆที่ใส่ใน input -->
      <div class="w-full bg-white mt-3 md:mt-0">
        <p class="text-[18px] md:text-[24px] font-bold text-center p-3">
          รายละเอียดข้อมูลลงประกาศของคุณ
        </p>
        >
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg">
          <div>
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >ชื่อบ้านเช่า :
            </span>
            <span
              class="font-bold text-[18px] md:text-[30px] break-words whitespace-normal block max-w-full"
              style="
                word-wrap: break-word;
                overflow-wrap: anywhere;
                overflow: hidden;
              "
            >
              {{ getHouse.datas.house_name }}
            </span>
          </div>
          <div>
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >ประเภทการขาย :
            </span>
            <span class="font-bold text-[18px] md:text-[30px] break-words">{{
              getHouse.datas.sell_type
            }}</span>
          </div>
          <div>
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >ประเภทที่พัก :
            </span>
            <span class="font-bold text-[18px] md:text-[30px] break-words">{{
              getHouse.datas.house_type
            }}</span>
          </div>
          <div>
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >โซนที่พัก :
            </span>
            <span class="font-bold text-[18px] md:text-[30px] break-words">
              {{ getHouse.datas.zone.zone_name }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-800 text-[16px] md:text-[24px]"
              >ราคาเช่า :
            </span>
            <span class="font-bold text-[18px] md:text-[30px] break-words"
              >{{ getHouse.datas.price }}
            </span>
            <div>
              <span
                v-if="getHouse.datas.sell_type === 'เช่า'"
                class="text-gray-800 text-[16px] md:text-[24px]"
              >
                บาท/เดือน
              </span>
              <span
                v-else-if="getHouse.datas.sell_type === 'ขาย'"
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
            <!-- รูปโชว์ตอนยังไม่ได้เลือกไฟล์รูป -->
            <div
              v-if="
                newImageMain ||
                (getHouse.datas.images_main && getHouse.datas.images_main.url)
              "
              class="md:w-[710px] relative"
            >
              <div class="w-full h-[200px] md:h-[408px]">
                <span
                  class="absolute top-2 left-2 text-white bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-1.5 rounded-[4px] shadow-md text-sm font-semibold"
                >
                  รูปหน้าปก
                </span>
                <img
                  class="w-full h-full rounded-lg object-cover"
                  :src="newImageMain || getHouse.datas.images_main.url"
                  alt="Uploaded"
                />
              </div>
            </div>
            <div
              v-else
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
              v-if="newImages.length || getHouse.datas.images.length"
              class="grid grid-cols-1 gap-1 overflow-auto overflow-x-hidden h-[408px]"
            >
              <!-- แสดงรูปใหม่ -->
              <div
                v-for="(newImage, index) in newImages"
                :key="'new-' + index"
                class="relative"
              >
                <button
                  @click="deleteImage(newImages, index)"
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
                    :src="newImage"
                    alt="Uploaded"
                  />
                </div>
              </div>
              <!-- แสดงรูปเก่า -->
              <div
                v-for="(image, index) in getHouse.datas.images"
                :key="'old-' + index"
                class="relative"
              >
                <button
                  @click="deleteImage(getHouse.datas.images, index)"
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
                    :src="image.url"
                    alt="Uploaded"
                  />
                </div>
              </div>
            </div>
            <div v-else class="xl:w-[340px] grid grid-cols-1 gap-1">
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
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <p class="text-[16px] md:text-[24px]">ข้อมูลที่พัก</p>
          <div class="grid grid-cols-2 md:grid-cols-4 place-items-start">
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="ion:bed-outline"
              />
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ getHouse.datas.number_of_rooms }}
              </p>
              <p class="text-[16px] md:text-[24px]">ห้องนอน</p>
            </div>
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="mdi:bathroom"
              />
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ getHouse.datas.number_of_bathrooms }}
              </p>
              <p class="text-[16px] md:text-[24px]">ห้องน้ำ</p>
            </div>
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="ri:stairs-line"
              />
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ getHouse.datas.floor }}
              </p>
              <p class="text-[16px] md:text-[24px]">ชั้น</p>
            </div>
            <div class="flex items-center justify-center gap-2 h-[40px]">
              <Icon
                class="text-sky-900 w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                name="material-symbols-light:background-grid-small-outline"
              />
              <p class="text-[16px] md:text-[24px] text-[#2eb840]">
                {{ getHouse.datas.size }}
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
                {{ getHouse.datas.electricity_rate }}
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
                {{ getHouse.datas.water_rate }}
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
            :class="getHouse.datas.description == '' && 'hidden'"
            class="w-full h-auto text-[16px] md:text-[20px] p-2 border rounded-md break-words whitespace-pre-line"
            :v-html="formattedMessage"
          >
            {{ getHouse.datas.description }}
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <label for="inputaddress" class="text-[16px] md:text-[24px]"
            >ที่อยู่ :
          </label>
          <div
            :class="getHouse.datas.address == '' && 'hidden'"
            class="w-full h-auto text-[16px] md:text-[20px] p-2 border rounded-md break-words whitespace-pre-line"
            :v-html="formattedMessage"
          >
            {{ getHouse.datas.address }}
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <p class="text-[16px] md:text-[24px]">สิ่งอำนวยความสะดวก</p>
          <div
            class="grid grid-cols-2 md:grid-cols-4 gap-y-[1px] md:gap-y-3"
            v-if="newArray.length"
          >
            <li
              class="text-[16px] md:text-[22px] custom-bullet"
              v-for="device in newArray"
              :key="device"
            >
              &nbsp;{{
                newArray !== null && device
                  ? itemsDetail.find((item: ItemDetail) => item.id === device)
                      ?.amenity_name
                  : ""
              }}
            </li>
          </div>
        </div>
        <div class="border md:ml-10 mx-4 md:my-3 p-4 rounded-md shadow-lg my-1">
          <p class="text-[16px] md:text-[24px]">ที่ตั้ง :</p>
          <!-- <Googlemap class="w-full h-[250px] md:h-[450px]" :datas="g_modal" /> -->
          <MarkMapApi
            class="w-full h-[250px] md:h-[450px]"
            :datas="getHouse.datas"
            @update:latLng="updateLatLng"
          />
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
                  {{ getHouse.datas.contact_info.first_name }}
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
                  {{ getHouse.datas.contact_info.last_name }}
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
                  {{ getHouse.datas.contact_info.phone_number }}
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
                  {{ getHouse.datas.contact_info.line_id }}
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
import type { getHouseID } from "~/models/house.model";
const getHouse = ref<getHouseID>({
  datas: {
    id: "",
    house_name: "",
    house_type: "",
    zone: {
      zone_name: "",
      id: "",
    },
    sell_type: "",
    size: 0,
    amenity: [],
    floor: 0,
    price: 0,
    number_of_rooms: 0,
    number_of_bathrooms: 0,
    water_rate: 0,
    electricity_rate: 0,
    description: "",
    address: "",
    location_latitute: 0,
    location_longitute: 0,
    is_recommend: false,
    images_main: {
      id: "",
      url: "",
      type: "",
    },
    images: [],
    contact_info: {
      first_name: "",
      last_name: "",
      phone_number: "",
      line_id: "",
    },
  },
  loading: false,
});

definePageMeta({
  layout: "register",
});


const lat = ref<number>(0);
const lng = ref<number>(0);

const updateLatLng = async (coords: { lat: number; lng: number }) => {
  lat.value = coords.lat;
  lng.value = coords.lng;
  // try {
  //   const response = await axios.post("/api/update-location", {
  //     lat: lat.value,
  //     lng: lng.value,
  //   });
  //   console.log("Location updated successfully:", response.data);
  // } catch (error) {
  //   console.error("Failed to update location:", error);
  // }
};

// const zone_id = ref<any>(zones.id[0].zones.id);

const route = useRoute();
const activeTab = ref<string>("fromDetail");
const description = ref<string>("");
const itemsZone = ref<any[]>([]);
interface ItemDetail {
  id: string;
  amenity_name: string;
}

const itemsDetail = ref<ItemDetail[]>([]);
const item_detail = ref<string[]>([]);
const newArray = ref<string[]>([]);
const router = useRouter();

// ฟังชั้นการกด Enter เเล้วเว้นบรรทัด
const formattedMessage = computed(() => {
  return description.value.replace(/\n/g, "<br>");
});

const switchTab = (tab: string) => {
  activeTab.value = tab;
};

const updateByHome = async (id: string) => {
  try {
    if (!route.params.id) {
      throw new Error("ID is required");
    }

    let remainingImageIDs: string = "";
    for (let i = 0; i < getHouse.value.datas.images.length; i++) {
      const image = getHouse.value.datas.images[i];
      console.log(image);

      remainingImageIDs += image.id;

      if (i < getHouse.value.datas.images.length - 1) remainingImageIDs += ",";
    }

    let remainingImageMainID: string = "";
    if (getHouse.value.datas.images_main) {
      remainingImageMainID = getHouse.value.datas.images_main.id;
    }

    const formdata: any = new FormData();
    formdata.append("id", route.params.id);
    formdata.append("house_name", getHouse.value.datas.house_name);
    formdata.append("house_type", getHouse.value.datas.house_type);
    formdata.append("zone_id", getHouse.value.datas.zone.id);
    formdata.append("sell_type", getHouse.value.datas.sell_type);
    formdata.append("price", getHouse.value.datas.price);
    formdata.append("size", getHouse.value.datas.size);
    formdata.append("floor", getHouse.value.datas.floor);
    formdata.append("number_of_rooms", getHouse.value.datas.number_of_rooms);
    formdata.append(
      "number_of_bathrooms",
      getHouse.value.datas.number_of_bathrooms
    );

    for (let i = 0; i < rawFiles.value.length; i++) {
      const rawFile = rawFiles.value[i];
      formdata.append("image", rawFile, rawFile.name);
    }

    if (rawFileMain.value) {
      formdata.append("image_main", rawFileMain.value, rawFileMain.value.name);
    }
    formdata.append("description", getHouse.value.datas.description);
    formdata.append("address", getHouse.value.datas.address);
    formdata.append("electricity_rate", getHouse.value.datas.electricity_rate);
    formdata.append("water_rate", getHouse.value.datas.water_rate);
    formdata.append("newArray", newArray.value);
    formdata.append("first_name", getHouse.value.datas.contact_info.first_name);
    formdata.append("last_name", getHouse.value.datas.contact_info.last_name);
    formdata.append(
      "phone_number",
      getHouse.value.datas.contact_info.phone_number
    );
    formdata.append("line_id", getHouse.value.datas.contact_info.line_id);
    formdata.append("location_latitute", lat.value?.toString());
    formdata.append("location_longitute", lng.value?.toString());
    formdata.append("remainingImageIDs", remainingImageIDs);
    formdata.append("remainingImageMainID", remainingImageMainID);

    const resp: any = await service.house.updateByEditHome(formdata, id);
    if (resp.Code == "200") {
      await Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
      });
      router.back();
    } else {
      throw new Error("Failed to update data");
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: error.message || "เกิดข้อผิดพลาด",
    });
  }
};

const getListHomeID = async () => {
  getHouse.value.loading = true;
  console.log("id", route.params.id);
  try {
    const resp: any = await service.house.listHomeID({
      id: route.params.id,
    });
    console.log("resp", resp);
    getHouse.value.datas = resp.Data || null;
    newArray.value = getHouse.value.datas.amenity.map((item) => item.id);
    console.log(newArray);
    console.log("getHouse", getHouse.value.datas);
  } catch (error: any) {
    console.log(error);
  } finally {
    getHouse.value.loading = false;
    updateMap();
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
      console.log("sssss", item_detail);
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
      { title: "แผนที่", link: "" },
      { title: "ยืนยันข้อมูล", link: "" },
    ],

    category: [
      { sell: "ขาย" },
      { sell: "เช่า" },
      // { sell: "ขายและเช่า" },
      // { sell: "เช่าระยะสั้น" },
      // { sell: "เช่าระยะยาว" },
    ],
    categoryhome: [
      { homelist: "บ้านพัก" },
      { homelist: "คอนโด" },
      { homelist: "บ้านเดียว" },
      { homelist: "บ้านแฝด" },
    ],
  },
]);

const newImages = ref<string[]>([]);
const rawFiles = ref<File[]>([]);

const newImageMain = ref<string>("");
const rawFileMain = ref<File>();

const handleSingleImageUpload = async (event: Event) => {
  let files2 = (event.target as HTMLInputElement).files;
  if (files2 && files2.length > 0) {
    const file2 = files2[0];
    const reader = new FileReader();
    reader.onload = () => {
      newImageMain.value = reader.result as string;
    };
    reader.readAsDataURL(file2);
    rawFileMain.value = file2;
  }
};

const handleMultipleImageUpload3 = async (event: Event) => {
  let files = (event.target as HTMLInputElement).files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        newImages.value.push(reader.result as string);
      };
      reader.readAsDataURL(file);
      rawFiles.value.push(file);
    }
  }
};

const deleteImage = (payload: any, index: number) => {
  payload.splice(index, index + 1);
};

function updateMap(): void {
  g_modal.value.location_latitute =
    getHouse.value.datas.location_latitute.toString();
  g_modal.value.location_longitute =
    getHouse.value.datas.location_longitute.toString();
}

onMounted(() => {
  getitem();
  getdetail();
  getListHomeID();
  // updateMap()
});

interface g_Modal {
  location_latitute: string;
  location_longitute: string;
}

const g_modal = ref<g_Modal>({
  location_latitute: "10.0",
  location_longitute: "10.1",
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
