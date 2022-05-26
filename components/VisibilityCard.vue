<template>
  <div class="w-small_card h-small_card">
    <div class="flex flex-col p-5 bg-contain bg-center bg-no-repeat bg-panel_small items-center space-y-5 w-full h-full">
    <h1 class="font-genshin text-base text-gray-700">Precipitation</h1>
    <div>
      <span
        class="font-genshin text-6xl text-gray-700 font-bold"
        data-test="visibility"
      >{{displayedVisibility}}</span>
      <span class="font-genshin text-4xl text-gray-700 font-medium">mm</span>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: "VisibilityCard",
  props: {
    precipitation: {
      type: Number,
      required: true
    }
  },
  computed: {
    displayedVisibility() {
      let rounded = Math.round(this.precipitation * 10) / 10;
      rounded = String(rounded);
      //rounded = rounded.replace(".", ",");
      return rounded;
    }
  }
};
</script>

<style>
</style>
