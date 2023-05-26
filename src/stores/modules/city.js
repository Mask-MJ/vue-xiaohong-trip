import { defineaStore } from 'pinia'

const useCityStore = defineStore("city", {
  store: () => ({
    cities: []
  }),
  actions: {}
})

export default useCityStore