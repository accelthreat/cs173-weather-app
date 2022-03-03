<template>
  <div class="flex flex-col p-5 bg-blue-500 items-center">
    <h1 class="font-sans text-base text-white">Humidity</h1>
    <div>
      <span class="font-sans text-6xl text-white font-bold" data-test="humidity">{{humidity}}</span>
      <span class="font-sans text-4xl text-white font-normal">%</span>
    </div>
    <div class="flex flex-col items-center w-full px-3">
      <div class="flex justify-between w-full">
        <div class="font-sans text-sm text-gray-500 font-bold">0</div>
        <div class="font-sans text-sm text-gray-500 font-bold">50</div>
        <div class="font-sans text-sm text-gray-500 font-bold">100</div>
      </div>
      <div class="bg-white w-full h-2 rounded-full">
        <div class="bg-yellow-500 h-2 rounded-full" :style="barProgress"></div>
      </div>
      <div class="flex justify-end w-full">
        <h6 class="font-sans text-sm text-gray-500 font-bold">%</h6>
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
