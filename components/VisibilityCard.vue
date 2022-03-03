<template>
  <div class="flex flex-col p-5 bg-blue-500 items-center">
    <h1 class="font-sans text-base text-white">Visibility</h1>
    <div>
      <span
        class="font-sans text-6xl text-white font-bold"
        data-test="visibility"
      >{{displayedVisibility}}</span>
      <span class="font-sans text-4xl text-white font-medium">miles</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisibilityCard",
  props: {
    visibility: {
      type: Number,
      required: true
    }
  },
  computed: {
    displayedVisibility() {
      let rounded = Math.round(this.visibility * 10) / 10;
      rounded = String(rounded);
      rounded = rounded.replace(".", ",");
      return rounded;
    }
  }
};
</script>

<style>
</style>
