<template>
  <div>
    <canvas id="ZoneProductionChart" style="width:100%;max-width:600px"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import service from "~/service";
import { Chart, ArcElement, Tooltip, Legend, Title, PieController } from "chart.js";

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title, PieController);

const items = ref<any[]>([]);

const getZoneData = async () => {
  try {
    const response = await service.house.GetHouseByZone();
    if (response.Code === "200") {
      items.value = response?.Data || [];
      updateChart(items.value);
    } else {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลได้",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "ข้อผิดพลาด",
      text: error.message,
    });
  }
};

const updateChart = (data: any[]) => {
  const xValues = data.map((item) => item.zone_name);
  const yValues = data.map((item) => item.count);
  const barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9" , "#673ab7"   ]; // Adjust colors as needed

  new Chart("ZoneProductionChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors.slice(0, data.length), // Limit colors to data size
          data: yValues,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "จำนวนบ้านในแต่ละโซน",
        },
      },
    },
  });
};

onMounted(() => {
  getZoneData();
});
</script>
