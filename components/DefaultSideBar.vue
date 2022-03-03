<template>
  <div class="bg-blue-500 flex flex-col pb-24 lg:pb-0">
    <div class="flex justify-between py-6 px-12 900p:p-12">
      <button
        class="bg-gray-700 font-sans text-base lg:text-xs 900p:text-base text-white py-2 px-5 lg:px-3 900p:px-5"
        @click.prevent="$emit('search-start')"
      >Search for places</button>
      <button
        aria-label="Get Location with GPS"
        class="rounded-full w-10 h-10 bg-gray-700 flex items-center justify-center focus:outline-none lg:ml-8"
        @click.prevent="$emit('get-user-location')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-current text-white h-6 w-6 lg:h-5 lg:w-5 900p:h-6 900p:w-6"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
          />
        </svg>
      </button>
    </div>
    <div :class="$style.bg" class="flex items-center justify-center">
      <transition name="fade" mode="out-in">
        <img
          :src="require(`@/assets/images/${image}`)"
          :key="image"
          alt="image"
          class="lg:h-full max-w-xxs object-cover w-full lg:w-1/2 900p:w-full h-auto"
        />
      </transition>
    </div>
    <div class="mx-auto lg:my-5">
      <span
        class="font-sans text-9xl lg:text-6xl 900p:text-9xl text-white font-medium"
      >{{displayedTodayTemp}}</span>
      <span
        class="font-sans text-5xl lg:text-3xl 900p:text-5xl text-gray-500 font-medium"
      >°{{fahrenheitToggle ? "F" : "C"}}</span>
    </div>
    <div
      class="mx-auto lg:my-5 font-sans text-4xl lg:text-2xl 900p:text-4xl text-gray-500 font-semibold"
    >{{weatherStateName}}</div>
    <div class="mx-auto mt-8 lg:mt-16">
      <span class="font-sans text-lg lg:text-base 900p:text-lg text-gray-600 font-medium">Today</span>
      <span class="font-sans text-lg lg:text-base 900p:text-lg text-gray-600 font-medium mx-2">•</span>
      <span
        class="font-sans text-lg lg:text-base 900p:text-lg text-gray-600 font-medium"
      >{{todayDate}}</span>
    </div>
    <div class="mx-auto mt-4 lg:mt-8 flex align-bottom">
      <span class="mr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="text-gray-600 fill-current h-6 w-6 lg:h-5 lg:w-5 900p:h-6 900p:w-6"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          />
        </svg>
      </span>
      <span
        class="font-sans text-lg lg:text-base 900p:text-lg text-gray-600 font-semibold"
      >{{cityName}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultSideBar",
  props: {
    cityName: {
      type: String,
      required: "true"
    },
    weatherStateName: {
      type: String,
      required: "true"
    },
    fahrenheitToggle: {
      type: Boolean,
      required: "true"
    },
    temperature: {
      type: Number,
      required: "true"
    }
  },
  computed: {
    displayedTodayTemp() {
      let temp = this.temperature;
      if (this.fahrenheitToggle) {
        temp = (temp * 9) / 5 + 32;
      }
      return Math.round(temp);
    },
    todayDate() {
      let date = new Date(Date.now());
      let arr = date.toDateString().split(" ");
      return arr[0] + ", " + arr[1] + " " + arr[2];
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
  }
};
</script>

<style module>
.bg {
  background-image: url("../assets/images/Cloud-background.png");
  background-size: contain;
}
</style>
