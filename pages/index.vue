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
  computed: {
    processedWeatherData() {
      let data = []
      if (Object.keys(this.weatherData).length === 0 && this.weatherData.constructor === Object) {
        return data
      } else {
        for(let i = 0; i<this.weatherData.daily.temperature_2m_min.length; i++) {
          data.push({
            date: this.weatherData.daily.time[i],
            weatherStateName: this.weatherStateCodeToName(this.weatherData.daily.weathercode[i]),
            maxTemp: this.weatherData.daily.temperature_2m_min[i],
            minTemp: this.weatherData.daily.temperature_2m_max[i],
            wind_speed: this.weatherData.daily.windspeed_10m_max[i],
            wind_direction: this.weatherData.daily.winddirection_10m_dominant[i],
            humidity: this.weatherData.hourly.relativehumidity_2m[i * 24],
            pressure: this.weatherData.hourly.pressure_msl[i * 24],
            precipitation: this.weatherData.daily.precipitation_sum[i],
          })
        }
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
        const { data } = await axios.get(
          `https://geolocation-db.com/json/${process.env.GEOLOCATION_KEY}/${ip}`
        );

        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&hourly=relativehumidity_2m,pressure_msl&daily=weathercode,precipitation_sum,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=Asia%2FSingapore`
        );

        return {
          initialCityList: [],
          weatherData: weatherData,
          city: "xzcvxcvxc"
        };
      } catch (error) {
        // console.log("serverSide asyncData error", error);
        const { data } = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=14.54&longitude=121.11&hourly=relativehumidity_2m,pressure_msl&daily=weathercode,precipitation_sum,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=Asia%2FSingapore" //ph 1199477
        );
        return {
          weatherData: data,
          city: "sdfsd"
        };
      }
    } else {
      try {
        // console.log("clientside asyncData");
        const { data } = await axios.get(
          `https://geolocation-db.com/json/${process.env.GEOLOCATION_KEY}`
        );

        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&hourly=relativehumidity_2m,pressure_msl&daily=weathercode,precipitation_sum,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=Asia%2FSingapore`
        );

        return {
          initialCityList: [],
          weatherData: weatherData,
          city: "sdfsdfsd"
        };
      } catch (error) {
        //console.log(error, "clientside asyncData");
        const { data } = await axios.get(
                   "https://api.open-meteo.com/v1/forecast?latitude=14.54&longitude=121.11&hourly=relativehumidity_2m,pressure_msl&daily=weathercode,precipitation_sum,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=Asia%2FSingapore" //ph 1199477
        );
        return {
          weatherData: data,
          city: "Manila"
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
        return "Light Cloud"
      } else if (code === 3 || code === 45 || code === 48) {
        return "Heavy Cloud"
      } else if (code > 50 && code < 56) {
        return "Light Rain"
      } else if (code > 60 && code < 66) {
        return "Heavy Rain"
      } else if (code > 65 && code < 68) {
        return "Sleet"
      } else if ((code >= 71 && code <= 77) || (code >= 85 && code <=86)) {
        return "Snow"
      } else if ((code >= 80 && code <= 82) || (code >=95 && code <=99)) {
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
    getUserLocationFromGPS() {
      if (!navigator?.geolocation) return;
      else {
        navigator.geolocation.getCurrentPosition(
          async position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

        //      const { data } = await axios.get(
        //   `https://geolocation-db.com/json/${process.env.GEOLOCATION_KEY}/${ip}`
        // );

        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=relativehumidity_2m,pressure_msl&daily=weathercode,precipitation_sum,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=Asia%2FSingapore`
        );
          
      this.weatherData = weatherData;
      this.city = "asdasd";

          },
          error => {
            console.log(error);
          }
        );
      }
    },
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
