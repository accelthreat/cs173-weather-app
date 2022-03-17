<template>
<div class="w-small_card h-small_card">
    <div class="flex flex-col p-5 bg-contain bg-center bg-no-repeat bg-panel_small items-center space-y-5 w-full h-full">
    <h1 class="font-genshin text-base text-gray-700">Air Pressure</h1>
    <div>
      <span
        class="font-genshin text-6xl text-gray-700 font-bold"
        data-test="pressure"
      >{{Math.round(pressure)}}</span>
      <span class="font-genshin text-4xl text-gray-700 font-medium">mb</span>
    </div>
  </div>
</div>
 
</template>

<script>
export default {
  name: "PressureCard",
  props: {
    pressure: {
      type: Number,
      required: true
    }
  }
};
</script>
