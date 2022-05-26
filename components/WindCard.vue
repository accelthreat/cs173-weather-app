<template>
<div class="w-big_card h-big_card">
   <div class="flex flex-col p-5 bg-contain bg-center bg-no-repeat bg-panel_large items-center space-y-5 w-full h-full">
    <h1 class="font-genshin text-base text-gray-700">Wind Status</h1>
    <div>
      <span class="font-genshin text-6xl text-gray-700 font-bold" data-test="speed">{{displayedSpeed}}</span>
      <span class="font-genshin text-4xl text-gray-700 font-medium">kph</span>
    </div>
    <div class="flex items-center">
      <div class="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          class="w-4 h-4 fill-current text-white"
          :transform="`rotate(${angle})`"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
        </svg>
      </div>
      <h3 class="font-genshin text-sm text-white ml-3" data-test="direction">{{direction}}</h3>
    </div>
  </div>
</div>
 
</template>

<script>
export default {
  name: "WindCard",
  props: {
    speed: {
      type: Number,
      required: true
    },
    direction: {
      type: Number,
      required: true
    }
  },
  computed: {
    displayedSpeed() {
      return Math.round(this.speed);
    },
    angle() {
      return this.direction
      let angle = -45;
      switch (this.direction) {
        case "N":
          break;
        case "NNW":
          angle -= 22.5;
          break;
        case "NW":
          angle -= 45;
          break;
        case "WNW":
          angle -= 67.5;
          break;
        case "W":
          angle -= 90;
          break;
        case "WSW":
          angle -= 112.5;
          break;
        case "SW":
          angle -= 135;
          break;
        case "SSW":
          angle -= 157.25;
          break;
        case "S":
          angle -= 180;
          break;

        case "NNE":
          angle += 22.5;
          break;
        case "NE":
          angle += 45;
          break;
        case "ENE":
          angle += 67.5;
          break;
        case "E":
          angle += 90;
          break;
        case "ESE":
          angle += 112.5;
          break;
        case "SE":
          angle += 135;
          break;
        case "SSE":
          angle += 157.25;
          break;
        default:
      }
      return angle;
    }
  }
};
</script>

<style>
</style>
