<template>
  <div>
    <div class="container">
      <div class="input-container">
        <input type="number" v-model="g_lat" placeholder="Enter latitude" />
        <input type="number" v-model="g_lng" placeholder="Enter longitude" />
        <button @click="setHomeLocation">Set Home Location</button>
      </div>
      <div id="map" class="map"></div>
      <div v-if="homeLocation" class="coordinates">
        <p>Home Latitude: {{ homeLocation.lat }}</p>
        <p>Home Longitude: {{ homeLocation.lng }}</p>
      </div>
    </div>
    <div class="category-buttons">
      <button @click="searchNearby('hospital')">สถานบริการด้านสุขภาพ</button>
      <button @click="searchNearby('school')">โรงเรียน</button>
      <button @click="searchNearby('restaurant')">อาหารและเครื่องดื่ม</button>
      <button @click="searchNearby('convenience_store')">ร้านสะดวกซื้อ</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "#app";

// 16.489188284199088, 102.82023940052535
const config = useRuntimeConfig();
const g_lat = ref<number | null>(null);
const g_lng = ref<number | null>(null);
const homeLocation = ref<{ lat: number; lng: number } | null>(null);
const markers = ref<any[]>([]);
let g_map: google.maps.Map;
let g_geocoder: google.maps.Geocoder;
let g_placesService: google.maps.places.PlacesService;

function initMap(): void {
  g_map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 16.4393, lng: 102.8221 }, // Default center
    zoom: 13,
  });

  g_geocoder = new google.maps.Geocoder();
  g_placesService = new google.maps.places.PlacesService(g_map);
}

function setHomeLocation(): void {
  if (g_lat.value !== null && g_lng.value !== null) {
    homeLocation.value = { lat: g_lat.value, lng: g_lng.value };
    addHomeMarker();
  }
}

function addHomeMarker(): void {
  if (homeLocation.value) {
    const homeMarker = new google.maps.Marker({
      position: homeLocation.value,
      map: g_map,
      title: "บ้านของคุณ",
      icon: "https://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png", // ใช้ไอคอนสำหรับบ้าน
    });
    g_map.setCenter(homeLocation.value); // เลื่อนแผนที่ไปที่บ้าน
    markers.value.push(homeMarker);
  }
}

function searchNearby(category: string): void {
  if (homeLocation.value) {
    const location = new google.maps.LatLng(
      homeLocation.value.lat,
      homeLocation.value.lng
    );
    const request = {
      location: location,
      radius: 1500, // ระยะทางในเมตร
      type: [category],
      zoom: 11,
    };

    g_placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        clearMarkers(); // ล้าง Marker เดิมก่อน
        results.forEach((place) => {
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: g_map,
            title: place.name,
            icon: getCategoryIcon(category),
          });
          markers.value.push(marker);
        });
      } else {
        console.error("Nearby search failed:", status);
      }
    });
  }
}

function clearMarkers(): void {
  markers.value.forEach((marker) => marker.setMap(null));
  markers.value = [];
}

function getCategoryIcon(category: string): string {
  switch (category) {
    case "hospital":
      return "https://maps.google.com/mapfiles/kml/shapes/hospitals.png";
    case "school":
      return "https://maps.google.com/mapfiles/kml/shapes/schools.png";
    case "restaurant":
      return "https://maps.google.com/mapfiles/kml/shapes/dining.png";
    case "convenience_store":
      return "https://img.icons8.com/ios-filled/50/000000/shopping-bag.png";
    default:
      return "";
  }
}

onMounted(() => {
  (window as any).initMap = initMap;

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&callback=initMap&v=weekly&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
}
.category-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}
.category-buttons button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.category-buttons button:hover {
  background-color: #0056b3;
}
</style>
