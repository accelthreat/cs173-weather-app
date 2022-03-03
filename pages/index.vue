<template>
  <div class="lg:grid lg:grid-cols-12 lg:gap-8 lg:min-h-screen">
    <keep-alive>
      <component
        :is="search ? 'SearchSideBar' : 'DefaultSideBar'"
        v-bind="sideBarProps"
        @search-start="search = true"
        @search-exit="search = false"
        @change-city="changeCity"
        @get-user-location="getUserLocationFromGPS"
        class="lg:fixed lg:inset-y-0 900p:w-3/12"
      />
    </keep-alive>
    <div
      class="col-start-5 lg:col-start-5 900p:col-start-5 col-span-7 lg:col-span-8 900p:col-span-7 p-10"
    >
      <div class="hidden lg:flex lg:flex-row justify-end lg:mb-10 900p:mb-16">
        <button
          class="rounded-full w-10 h-10 flex items-center justify-center focus:outline-none mr-2 font-sans text-lg font-bold"
          @click.prevent="fahrenheitToggle = false"
          :class="fahrenheitToggle ? 'bg-blue-400 text-white' : 'bg-white text-blue-700'"
        >°C</button>
        <button
          class="rounded-full w-10 h-10 flex items-center justify-center focus:outline-none font-sans text-lg font-bold"
          @click.prevent="fahrenheitToggle = true"
          :class="fahrenheitToggle ? 'bg-white text-blue-700' : 'bg-blue-400 text-white'"
        >°F</button>
      </div>
      <div class="grid grid-cols-2 gap-8 lg:grid-cols-5">
        <DayWeather
          :date="weather.applicable_date"
          :weatherStateName="weather.weather_state_name"
          :maxTemp="weather.max_temp"
          :minTemp="weather.min_temp"
          :isFahrenheit="fahrenheitToggle"
          v-for="(weather, index) in futureWeathers"
          :key="index"
        />
      </div>
      <div class="mt-8">
        <h2 class="font-sans text-2xl text-white font-bold">Today's Highlights</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 900p:gap-12 mt-4">
          <WindCard
            :speed="todayWeatherData.wind_speed"
            :direction="todayWeatherData.wind_direction_compass"
          />
          <HumidityCard :humidity="todayWeatherData.humidity" />
          <VisibilityCard :visibility="todayWeatherData.visibility" />
          <PressureCard :pressure="todayWeatherData.air_pressure" />
        </div>
      </div>
      <div
        class="mt-10 font-semibold text-gray-800 text-sm flex justify-center"
      >Daniel Montecastro and Matthew Lemuel Rey CS173</div>
    </div>
  </div>
</template>

<script>
import DayWeather from "@/components/DayWeather";
import PressureCard from "@/components/PressureCard";
import VisibilityCard from "@/components/VisibilityCard";
import WindCard from "@/components/WindCard";
import HumidityCard from "@/components/HumidityCard";
import DefaultSideBar from "@/components/DefaultSideBar";
import SearchSideBar from "@/components/SearchSideBar";
import axios from "axios";

export default {
  components: {
    DayWeather,
    PressureCard,
    VisibilityCard,
    WindCard,
    HumidityCard,
    DefaultSideBar,
    SearchSideBar
  },
  data() {
    return {
      weatherData: [],
      city: "",
      fahrenheitToggle: false,
      search: false,
      initialCityList: []
    };
  },
  computed: {
    todayDate() {
      let date = new Date(Date.now());
      let arr = date.toDateString().split(" ");
      return arr[0] + ", " + arr[1] + " " + arr[2];
    },
    todayWeatherData() {
      return this.weatherData[0];
    },
    futureWeathers() {
      return this.weatherData.slice(1);
    },
    sideBarProps() {
      if (this.search) {
        return {
          class: "lg:col-span-3 900p:col-span-3",
          initialCityList: this.initialCityList
        };
      } else {
        return {
          class: "lg:col-span-3 900p:col-span-3",
          cityName: this.city,
          weatherStateName: this.todayWeatherData.weather_state_name,
          fahrenheitToggle: this.fahrenheitToggle,
          temperature: this.todayWeatherData.the_temp
        };
      }
    }
  },
  async asyncData({ req, res }) {
    if (process.server) {
      // console.log("serverSide asyncData");
      // console.log(req);
      const ip =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

      console.log(ip);
      try {
        const { data } = await axios.get(
          `https://geolocation-db.com/json/${process.env.GEOLOCATION_KEY}/${ip}`
        );

        const cityData = await axios.get(
          `https://meta-weather.now.sh/api/location/search/?lattlong=${data.latitude},${data.longitude}`
        );

        const weatherData = await axios.get(
          `https://meta-weather.now.sh/api/location/${cityData.data[0].woeid}/`
        );

        return {
          initialCityList: cityData.data,
          weatherData: weatherData.data.consolidated_weather,
          city: weatherData.data.title
        };
      } catch (error) {
        // console.log("serverSide asyncData error", error);
        const { data } = await axios.get(
          "https://meta-weather.now.sh/api/location/2487956/" //ph 1199477
        );
        return {
          weatherData: data.consolidated_weather,
          city: data.title
        };
      }
    } else {
      try {
        // console.log("clientside asyncData");
        const { data } = await axios.get(
          `https://geolocation-db.com/json/${process.env.GEOLOCATION_KEY}`
        );

        const cityData = await axios.get(
          `https://meta-weather.now.sh/api/location/search/?lattlong=${data.latitude},${data.longitude}`
        );

        const weatherData = await axios.get(
          `https://meta-weather.now.sh/api/location/${cityData.data[0].woeid}/`
        );

        return {
          initialCityList: cityData.data,
          weatherData: weatherData.data.consolidated_weather,
          city: weatherData.data.title
        };
      } catch (error) {
        //console.log(error, "clientside asyncData");
        const { data } = await axios.get(
          "https://meta-weather.now.sh/api/location/2487956/" //ph 1199477
        );
        return {
          weatherData: data.consolidated_weather,
          city: data.title
        };
      }
    }
  },
  mounted() {
    // this.getUserLocationFromIp();
  },
  methods: {
    async changeCity(woeid) {
      const { data } = await axios.get(
        `https://meta-weather.now.sh/api/location/${woeid}/`
      );

      this.weatherData = data.consolidated_weather;
      this.city = data.title;
    },
    async fetchCitiesFromCoord(latitude, longitude) {
      const { data } = await axios.get(
        `https://meta-weather.now.sh/api/location/search/?lattlong=${latitude},${longitude}`
      );
      return data;
    },
    getUserLocationFromGPS() {
      if (!navigator?.geolocation) return;
      else {
        navigator.geolocation.getCurrentPosition(
          async position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const data = await this.fetchCitiesFromCoord(latitude, longitude);
            this.initialCityList = data;
            await this.changeCity(data[0].woeid);
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    async getUserLocationFromIp() {
      try {
        // console.log(process.env.GEOLOCATION_KEY);
        const { data } = await axios.get(
          `https://geolocation-db.com/json/${process.env.GEOLOCATION_KEY}`
        );

        const citiesData = await this.fetchCitiesFromCoord(
          data.latitude,
          data.longitude
        );

        this.initialCityList = citiesData;
        await this.changeCity(citiesData[0].woeid);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
