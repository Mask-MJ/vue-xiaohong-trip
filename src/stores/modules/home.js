import { defineStore } from "pinia";
// import hyRequest from "@/services/request/index.js";
import { getHomeHotSuggests, getHomeCategories, getHomeHouseList } from "@/services";

const uesHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    //当前页码currentPage  默认为1
    currentPage: 1,
    houseList: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      // console.log(res);
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      // console.log(res);
      this.categories = res.data
    },
    async fetchHouseListDate() {
      //传入currentPage: 当前页码 
      const res = await getHomeHouseList(this.currentPage)
      // console.log(res.data);
      // 将获取到的数据使用...展开运算符添加到houseList中, 而不是直接赋值:this.houseList = res.data
      this.houseList.push(...res.data)
      // console.log(this.houseList);
      this.currentPage++

    }
  }

})

export default uesHomeStore

// const hotSuggests = ref([]);
// hyRequest
//   .get({
//     url: "/home/hotSuggests",
//   })
//   .then((res) => {
//     console.log(res);
//     hotSuggests.value = res.data;
//   });

// //2. 热门推荐
// //热门数据接口: http://123.207.32.32:1888/api/home/categories
// const categories = ref([]);
// hyRequest
//   .get({
//     url: "/home/categories",
//   })
//   .then((res) => {
//     console.log(res);
//     categories.value = res.data;
//   });