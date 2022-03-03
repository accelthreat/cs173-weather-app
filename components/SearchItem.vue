<template>
  <button
    class="px-4 py-6 border border-blue-500 hover:border-gray-800 text-white font-medium flex justify-between w-full focus:outline-none"
    @mouseover="hover = true"
    @mouseout="hover = false"
    @click.prevent="onClick"
  >
    {{cityName}}
    <span :class="hover ? '' : 'opacity-0'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-6 w-6 fill-current text-gray-800"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    </span>
  </button>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    cityName: {
      type: String,
      required: true
    },
    woeid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hover: false
    };
  },
  methods: {
    onClick() {
      this.$emit("change-city", this.woeid);
    }
  }
};
</script>
