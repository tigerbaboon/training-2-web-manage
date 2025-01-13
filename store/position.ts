import { defineStore } from 'pinia';

export const usePositionStore = defineStore('positions', {
  state: () => {
    return {
      lat: 0,
      lng: 0,
    };
  },
  actions: {
    setLatLng(lat: number, lng: number) {
      this.lat = lat;
      this.lng = lng;
    },
  },
});