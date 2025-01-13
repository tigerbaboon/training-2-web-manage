<template>
  <div class="map-container">
    <!-- ส่วนควบคุม -->
    <div class="controls">
      <input
        type="text"
        v-model="inputText"
        placeholder="ใส่ตำแหน่งที่ต้องการค้นหา"
      />
      <button @click="geocode({ address: inputText })" class="btn-primary">
        ค้นหา
      </button>
      <button @click="clear" class="btn-secondary">ล้าง</button>
    </div>
    <!-- แผนที่ -->
    <div id="map" class="map"></div>

    <!-- การแสดงผลลัพธ์ -->
    <div v-if="responseVisible" class="response">
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "#app";

// ตัวแปรสำคัญ
let map;
let marker;
let geocoder;

const inputText = ref("");
const response = ref("");
const responseVisible = ref(false);

// ดึงค่า API Key จาก Runtime Config
const config = useRuntimeConfig();

// ฟังก์ชันสำหรับการตั้งค่า Map
const initMap = () => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  map = new google.maps.Map(mapContainer, {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
  });

  geocoder = new google.maps.Geocoder();
  marker = new google.maps.Marker({ map });

  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
};

// ฟังก์ชัน Geocode
const geocode = (request) => {
  clear(); // ล้างข้อมูลเก่าก่อน

  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      if (results.length > 0 && results[0].geometry?.location) {
        const location = results[0].geometry.location;

        // ตั้งค่าแผนที่ไปที่ตำแหน่งที่ค้นพบ
        map.setCenter(location);
        marker.setPosition(location);
        marker.setMap(map);

        responseVisible.value = true;
        response.value = JSON.stringify(results, null, 2);
      } else {
        alert("ไม่พบผลลัพธ์สำหรับตำแหน่งนี้");
      }
    })
    .catch((e) => {
      alert("Geocode ไม่สำเร็จด้วยเหตุผล: " + e);
    });
};

// ฟังก์ชัน Clear Map
const clear = () => {
  if (marker) marker.setMap(null);
  responseVisible.value = false;
};

// โหลด Google Maps API
onMounted(() => {
  const googleScript = document.createElement("script");
  googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places&callback=initMap`;
  googleScript.async = true;
  googleScript.defer = true;

  // กำหนดฟังก์ชัน initMap ให้ทำงานเมื่อโหลด API สำเร็จ
  window.initMap = initMap;
  document.head.appendChild(googleScript);
});


</script>

<style scoped>
.map-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
}

.map {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
}

.response {
  background: #f7f7f7;
  padding: 1rem;
  border: 1px solid #ddd;
}
</style>
