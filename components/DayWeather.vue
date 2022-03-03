<template>
  <div class="flex flex-col p-5 bg-blue-500 items-center justify-between">
    <h5
      class="font-sans text-base lg:text-sm xl:text-base text-white"
      data-test="date"
    >{{actualDate}}</h5>
    <div class="flex-shrink-0 mt-1">
      <transition name="fade" mode="out-in">
        <img
          :src="require(`@/assets/images/${image}`)"
          :key="image"
          alt="image"
          class="w-20 lg:w-16 xl:w-20 h-auto"
        />
      </transition>
    </div>
    <div class="mt-8 flex flex-row justify-between w-full px-2">
      <span
        class="font-sans text-base lg:text-sm xl:text-base text-white"
        data-test="maxtemp"
      >{{displayedMaxTemp}}</span>
      <span
        class="font-sans text-base lg:text-sm xl:text-base text-gray-500"
        data-test="mintemp"
      >{{displayedMinTemp}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DayWeather",
  props: {
    date: {
      type: String,
      required: true
    },
    weatherStateName: {
      type: String,
      required: true
    },
    maxTemp: {
      type: Number,
      required: true
    },
    minTemp: {
      type: Number,
      required: true
    },
    isFahrenheit: {
      type: Boolean
    }
  },
  computed: {
    actualDate() {
      const date = new Date(this.date);
      if (this.isTomorrow(date)) {
        return "Tomorrow";
      } else {
        let arr = date.toDateString().split(" ");
        return arr[0] + ", " + arr[1] + " " + arr[2];
      }
    },
    displayedMinTemp() {
      let temp = this.minTemp;
      if (this.isFahrenheit) {
        temp = (temp * 9) / 5 + 32;
      }
      const unit = this.isFahrenheit ? "F" : "C";
      return `${Math.round(temp)}°${unit}`;
    },
    displayedMaxTemp() {
      let temp = this.maxTemp;
      if (this.isFahrenheit) {
        temp = (temp * 9) / 5 + 32;
      }
      const unit = this.isFahrenheit ? "F" : "C";
      return `${Math.round(temp)}°${unit}`;
    },
    image() {
      let url;
      switch (this.weatherStateName) {
        case "Showers":
          url = "Shower.png";
          break;
        case "Light Cloud":
          url = "LightCloud.png";
          break;
        case "Heavy Cloud":
          url = "HeavyCloud.png";
          break;
        case "Sleet":
          url = "Sleet.png";
          break;
        case "Hail":
          url = "Hail.png";
          break;
        case "Thunderstorm":
          url = "Thunderstorm.png";
          break;
        case "Heavy Rain":
          url = "HeavyRain.png";
          break;
        case "Light Rain":
          url = "LightRain.png";
          break;
        case "Clear":
          url = "Clear.png";
          break;
        case "Snow":
          url = "Snow.png";
          break;
        default:
          url = "Clear.png";
      }
      return url;
    }
  },
  methods: {
    isTomorrow(date) {
      const today = new Date(Date.now());
      if (
        today.getFullYear() == date.getFullYear() &&
        today.getMonth() == date.getMonth() &&
        today.getDate() + 1 == date.getDate()
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.test-enter-active,
.test-leave-active {
  transition: all 2s ease;
}
.test-enter,
.test-leave-to {
  opacity: 0;
}
</style>
