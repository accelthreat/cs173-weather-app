<template>
  <div class="flex flex-col p-5 bg-blue-500 items-center">
    <h1 class="font-sans text-base text-white">Air Pressure</h1>
    <div>
      <span
        class="font-sans text-6xl text-white font-bold"
        data-test="pressure"
      >{{Math.round(pressure)}}</span>
      <span class="font-sans text-4xl text-white font-medium">mb</span>
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
