<template>
  <div class="flex flex-col p-5 bg-panel_small items-center space-y-3">
    <h1 class="font-genshin text-base text-gray-700">Visibility</h1>
    <div>
      <span
        class="font-genshin text-6xl text-gray-700 font-bold"
        data-test="visibility"
      >{{displayedVisibility}}</span>
      <span class="font-genshin text-4xl text-gray-700 font-medium">miles</span>
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
