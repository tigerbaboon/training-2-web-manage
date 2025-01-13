<template>
  <div class="map-container">
    <div class="controls">
      <input
        type="text"
        v-model="inputText"
        placeholder="ใส่ตำแหน่งที่ต้องการค้นหา"
      />
      <button @click="handleGeocode" class="btn-primary">ค้นหา</button>
      <button @click="clear" class="btn-secondary">ล้าง</button>
    </div>
    <div id="map" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRuntimeConfig } from "#app";

declare global {
  interface Window {
    initMap: () => void;
  }
}

const emit = defineEmits(["update:latLng"]);

const props = defineProps({
  datas: {
    type: Object,
    default: () => null,
  },
});

// Import Google Maps types
/// <reference types="@types/google.maps" />

let map: google.maps.Map;
let marker: google.maps.Marker;
let geocoder: google.maps.Geocoder | null = null;

const inputText = ref("");
const response = ref("");
const responseVisible = ref(false);
const lat = ref<number | null>(null);
const lng = ref<number | null>(null);

const config = useRuntimeConfig();

const initMap = () => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  map = new google.maps.Map(mapContainer, {
    zoom: 14,
    center: { lat: 16.4321938, lng: 102.8236214 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();
  marker = new google.maps.Marker({ map });

  map.addListener("click", (e:any) => {
    if (e.latLng) {
      geocode({ location: e.latLng });
    }
  });

  // ตั้งค่าพิกัดเริ่มต้นจาก props.datas ถ้ามี
  if (
    props.datas &&
    props.datas.location_latitute &&
    props.datas.location_longitute
  ) {
    const initialLat = parseFloat(props.datas.location_latitute);
    const initialLng = parseFloat(props.datas.location_longitute);
    const initialLocation = { lat: initialLat, lng: initialLng };

    lat.value = initialLat;
    lng.value = initialLng;

    map.setCenter(initialLocation);
    marker.setPosition(initialLocation);
    marker.setMap(map);
  }
};

const geocode = (request: google.maps.GeocoderRequest) => {
  if (!geocoder) {
    alert("Geocoder ยังไม่ได้ถูกกำหนดค่า11");
    console.error("Geocoder is not defined");
    return;
  }
  geocoder
    .geocode(request)
    .then((result: any) => {
      const { results } = result;

      if (results.length > 0 && results[0].geometry?.location) {
        const location = results[0].geometry.location;

        lat.value = location.lat();
        lng.value = location.lng();

        map.setCenter(location);
        marker.setPosition(location);
        marker.setMap(map);

        // console.log(typeof lat.value, typeof lng.value);

        // if (lat.value && lng.value) {
        //   map.setCenter(lat.value, lng.value);
        //   marker.setPosition(lat);
        //   marker.setMap(map);
        // }

        responseVisible.value = true;
        response.value = JSON.stringify(
          { latitude: lat.value, longitude: lng.value, fullResult: results },
          null,
          2
        );

        emit("update:latLng", { lat: lat.value, lng: lng.value });
        console.log("update:", { lat: lat.value, lng: lng.value });
      } else {
        alert("ไม่พบผลลัพธ์สำหรับตำแหน่งนี้");
      }
    })
    .catch((e) => {
      alert("Geocode ไม่สำเร็จด้วยเหตุผล: " + e);
    });
};

const handleGeocode = () => {
  if (!geocoder) {
    alert("Geocoder ยังไม่ได้ถูกกำหนดค่า");
    console.error("Geocoder is not defined");
    return;
  }
  console.log("Geocoder is defined:", geocoder);
  geocode({ address: inputText.value });
};

const clear = () => {
  if (marker) marker.setMap(null);
  responseVisible.value = false;
  lat.value = null;
  lng.value = null;
};

onMounted(() => {  
  
  window.initMap = initMap;
  
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    console.error("Failed to load Google Maps script");
  };
  document.head.appendChild(script);
  // initMap();
});

watch(
  () => props.datas,
  (newVal) => {
    if (newVal && newVal.location_latitute && newVal.location_longitute) {
      const newLat = parseFloat(newVal.location_latitute);
      const newLng = parseFloat(newVal.location_longitute);
      const newLocation = { lat: newLat, lng: newLng };

      lat.value = newLat;
      lng.value = newLng;

      if (map) {
        map.setCenter(newLocation);
        marker.setPosition(newLocation);
        marker.setMap(map);
      }
    }
  },
  { immediate: true }
);
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
