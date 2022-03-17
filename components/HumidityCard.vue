<template>
<div class="w-big_card h-big_card">
  <div class="flex flex-col p-5 bg-contain bg-center bg-no-repeat bg-panel_large items-center space-y-5 w-full h-full">
    <h1 class="font-genshin text-base text-gray-700">Humidity</h1>
    <div>
      <span class="font-genshin text-6xl text-gray-700 font-bold" data-test="humidity">{{humidity}}</span>
      <span class="font-genshin text-4xl text-gray-700 font-normal">%</span>
    </div>
    <div class="flex flex-col items-center w-full px-3">
      <div class="flex justify-between w-full">
        <div class="font-genshin text-sm text-gray-700 font-bold">0</div>
        <div class="font-genshin text-sm text-gray-700 font-bold">50</div>
        <div class="font-genshin text-sm text-gray-700 font-bold">100</div>
      </div>
      <div class="bg-white w-full h-2 rounded-full">
        <div class="bg-yellow-500 h-2 rounded-full" :style="barProgress"></div>
      </div>
      <div class="flex justify-end w-full">
        <h6 class="font-genshin text-sm text-gray-700 font-bold">%</h6>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "WindCard",
  props: {
    humidity: {
      type: Number,
      required: true
    }
  },

  computed: {
    barProgress() {
      return {
        width: this.humidity + "%"
      };
    }
  }
};
</script>