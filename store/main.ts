import { defineStore } from 'pinia'

interface state {
    openSideber: boolean
}

export const useIndexStore = defineStore('index', {
    state: (): state => ({
        openSideber: true,
    }),



})
