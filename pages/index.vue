<template>
  <div class="bg-main bg-fixed bg-right lg:grid lg:grid-cols-12 lg:gap-8 lg:min-h-screen">
    <keep-alive>
      <DefaultSideBar v-bind="sideBarProps" @get-user-location="getUserLocationFromGPS"/>
    </keep-alive>
    <div
      class="col-start-5 lg:col-start-5 900p:col-start-5 col-span-7 lg:col-span-8 900p:col-span-7 p-10"
    >
      <div class="hidden lg:flex lg:flex-row justify-end lg:mb-10 900p:mb-16">
        <button
          class="rounded-full w-10 h-10 flex items-center justify-center focus:outline-none mr-2 font-genshin text-lg font-bold"
          @click.prevent="fahrenheitToggle = false"
          :class="fahrenheitToggle ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'"
        >°C</button>
        <button
          class="rounded-full w-10 h-10 flex items-center justify-center focus:outline-none font-genshin text-lg font-bold"
          @click.prevent="fahrenheitToggle = true"
          :class="fahrenheitToggle ? 'bg-white text-gray-700' : 'bg-gray-700 text-white'"
        >°F</button>
      </div>
      <div class="grid grid-cols-2 gap-8 lg:grid-cols-5">
        <DayWeather
          :date="weather.date"
          :weatherStateName="weather.weatherStateName"
          :maxTemp="weather.maxTemp"
          :minTemp="weather.minTemp"
          :isFahrenheit="fahrenheitToggle"
          v-for="(weather, index) in futureWeathers"
          :key="index"
        />
      </div>
      <div class="mt-8">
        <h2 class="font-genshin text-2xl text-white font-bold">Today's Highlights</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 900p:gap-12 mt-4">
          <WindCard
            :speed="todayWeatherData.wind_speed"
            :direction="todayWeatherData.wind_direction"
          />
          <HumidityCard :humidity="todayWeatherData.humidity" />
          <VisibilityCard :precipitation="todayWeatherData.precipitation" />
          <PressureCard :pressure="todayWeatherData.pressure" />
        </div>
      </div>
      <div
        class="mt-10 font-genshin text-zinc-400 text-sm flex justify-center"
      >Daniel Montecastro and Matthew Lemuel Rey CS173</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DayWeather from "@/components/DayWeather";
import PressureCard from "@/components/PressureCard";
import VisibilityCard from "@/components/VisibilityCard";
import WindCard from "@/components/WindCard";
import HumidityCard from "@/components/HumidityCard";
import DefaultSideBar from "@/components/DefaultSideBar";
import SearchSideBar from "@/components/SearchSideBar";

const hours = "&hourly=relativehumidity_2m,pressure_msl"
const daily = "&daily=weathercode,precipitation_sum,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant"
const timez = "&timezone=Asia%2FSingapore"
const settings = hours + daily + timez

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
      weatherData: {},
      city: "",
      fahrenheitToggle: false,
      search: false,
      initialCityList: []
    };
  },
  self_loc() {
    return {

    }
  },
  computed: {
    processedWeatherData() {
      let data = []
      if (Object.keys(this.weatherData).length === 0 && this.weatherData.constructor === Object) {
        return data
      } else {
        console.log("WeatherData");
        console.log(JSON.stringify(this.weatherData));
        const info = this.weatherData.data;
        console.log("WeatherData.daily");
        console.log(JSON.stringify(this.weatherData.daily));
        console.log("WeatherData.data");
        console.log(JSON.stringify(info.daily));
        for(let i = 0; i<info.daily.temperature_2m_min.length; i++) {
          data.push({
            date: info.daily.time[i],
            weatherStateName: this.weatherStateCodeToName(info.daily.weathercode[i]),
            maxTemp: info.daily.temperature_2m_min[i],
            minTemp: info.daily.temperature_2m_max[i],
            wind_speed: info.daily.windspeed_10m_max[i],
            wind_direction: info.daily.winddirection_10m_dominant[i],
            humidity: info.hourly.relativehumidity_2m[i * 24],
            pressure: info.hourly.pressure_msl[i * 24],
            precipitation: info.daily.precipitation_sum[i],
          })
        }
      
      console.log(JSON.stringify(data))
      return data
      }
    },
    todayDate() {
      const date = new Date(Date.now());
      const arr = date.toDateString().split(" ");
      return arr[0] + ", " + arr[1] + " " + arr[2];
    },
    todayWeatherData() {
      return this.processedWeatherData[0]
    },
    futureWeathers() {
      return this.processedWeatherData.slice(1,6);
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
          weatherStateName: this.todayWeatherData.weatherStateName,
          fahrenheitToggle: this.fahrenheitToggle,
          temperature: this.todayWeatherData.maxTemp
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
        console.log(JSON.stringify("Default Move?"))
        const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`);

        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}${settings}`
        );

        return {
          initialCityList: [],
          weatherData: weatherData,
          city: "Test 1"
        };

      } catch (error) {
        console.log(JSON.stringify("Error 1 on Manila"))
        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842${settings}`
        );

        return {
          weatherData: weatherData,
          city: "Manila"
        };
      }
    } else {
      try {
        console.log(JSON.stringify("First Run"))
        const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`);

        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}${settings}`
        );

        return {
          initialCityList: [],
          weatherData: weatherData,
          city: "Test 2"
        };

      } catch (error) {
        console.log(JSON.stringify("Error 2 on Manila"))
        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842${settings}`
        );

        return {
          weatherData: weatherData,
          city: "Manila 2"
        };
      }
    }
  },
  mounted() {
    // this.getUserLocationFromIp();
  },
  methods: {
    weatherStateCodeToName(code) {
      if(code === 0) {
        return "Clear"
      } else if (code > 0 && code < 3) {
        return "Cloudy"
      } else if (code === 3 || code === 45 || code === 48) {
        return "Foggy"
      } else if ((code > 50 && code < 56) || (code > 60 && code < 64)) {
        return "Light Rain"
      } else if (code === 65 || (code > 79 && code < 83)) {
        return "Heavy Rain"
      } else if ((code > 55 && code < 58) || (code > 65 && code < 68)) {
        return "Sleet"
      } else if ((code > 70 && code < 78) || (code > 84 && code < 87)) {
        return "Snow"
      } else if (code > 94 && code < 100) {
        return "Thunderstorm"
      } else {
        return "Clear"
      }
    },
    async fetchCitiesFromCoord(latitude, longitude) {
      const { data } = await axios.get(
        `https://meta-weather.now.sh/api/location/search/?lattlong=${latitude},${longitude}`
      );
      return data;
    },
    async getUserLocationFromGPS() {
      const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`);
      const weatherData = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}${settings}`
      );
  
      this.city = (data.city === '' ? '???' : data.city) //+ data.latitude + " " + data.longitude
      this.weatherData = weatherData;

      error => { console.log(error); }
    }, //
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
