<template>
  <div class="container">
    <div id="map" class="map"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "#app";

const props = defineProps({
  datas: {
    type: Object,
    default: () => null,
  },
});


const g_address = ref<string>("");
const g_lat = ref("");
const g_lng = ref("");
let g_map: google.maps.Map;
let g_geocoder: google.maps.Geocoder;
let g_marker: google.maps.Marker;

const config = useRuntimeConfig();

function initMap(): void {
  g_map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 0.0, lng: 0.0 },
    zoom: 8,
  });

  g_geocoder = new google.maps.Geocoder();
  g_marker = new google.maps.Marker({
    g_map,
  });
}

function geocodeLatLng() {
  if (g_lat.value === null || g_lng.value === null) {
    alert("Please enter both latitude and longitude.");
    return;
  }

  const latLng = {
    lat: parseFloat(g_lat.value.toString()),
    lng: parseFloat(g_lng.value.toString()),
  };

  g_geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === "OK") {
      if (results[0]) {
        g_map.setCenter(latLng);
        g_marker.setPosition(latLng);
        g_marker.setMap(g_map);
        g_address.value = results[0].formatted_address;
      } else {
        alert("No results found");
      }
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

onMounted(() => {
  (window as any).initMap = initMap;

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&callback=initMap&v=weekly&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  g_lat.value = props.datas.location_latitute;
  g_lng.value = props.datas.location_longitute;

  console.log(g_lat.value, g_lng.value);

  setTimeout(() => {
    geocodeLatLng();
  }, 1000);
});
watchEffect(() => {
  g_lat.value = props.datas.location_latitute;
  g_lng.value = props.datas.location_longitute;
  console.log(g_lat.value, g_lng.value);
  setTimeout(() => {
    geocodeLatLng();
  }, 1000);
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.input-container {
  display: flex;
  gap: 10px;
}

.map {
  width: 100%;
  height: 500px;
}

.coordinates {
  margin-top: 10px;
  text-align: center;
}
</style>
