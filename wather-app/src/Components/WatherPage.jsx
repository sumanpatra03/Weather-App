import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CloudIcon from "../assets/icon/cloude.png";
import RainIcon from "../assets/icon/rain.png";
import FogIcon from "../assets/icon/fog.png";
import SunIcon from "../assets/icon/sun.png";
import Sunnybg from "../assets/image/sunny2.jpg";
import Rainbg from "../assets/image/rain2.jpg";
import Cloudybg from "../assets/image/cloudy2.jpg";
import Clearbg from "../assets/image/clear2.jpg";
import ForeCast from "./ForeCast";

const WeatherPage = () => {
  const { cityName } = useParams();
  console.log(cityName);

  const [weatherData, setWeatherData] = useState(null);
  const [wIcon, setWIcon] = useState(FogIcon);
  const [weatherBg, setWeatherBg] = useState(Sunnybg);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setWeatherData(res.data);
      } catch (error) {
        console.log("fetching weather error", error);
      }
    };
    fetchData();
  }, [cityName]);

  useEffect(() => {
    if (weatherData && weatherData.weather) {
      let w = weatherData.weather[0].main;
      if (w === "Clouds") {
        setWIcon(CloudIcon);
        setWeatherBg(Cloudybg);
      } else if (w === "Rain") {
        setWIcon(RainIcon);
        setWeatherBg(Rainbg);
      } else if (w == "Clear") {
        setWIcon(SunIcon);
        setWeatherBg(Clearbg);
      }
    }
  }, [weatherData]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const temperature = (weatherData.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
  const maxTemp = (weatherData.main.temp_max - 273.15).toFixed(1);
  const minTemp = (weatherData.main.temp_min - 273.15).toFixed(1);
  const weatherDescription = weatherData.weather[0].description;

  return (
    <div>
      <div>
        {weatherData && (
          <div
            className="min-h-screen flex items-center justify-center gap-5 flex-col sm:flex-row xl:flex-col"
            style={{
              backgroundImage: `url(${weatherBg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs border-4">
              <div className="font-bold text-xl">{weatherData.name}</div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </div>
              <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                <img src={wIcon} alt="" />
              </div>
              <div className="flex flex-row items-center justify-center mt-6">
                <div className="font-medium text-6xl">{temperature}°C</div>
                <div className="flex flex-col items-center ml-6">
                  <div>{weatherDescription}</div>
                  <div className="mt-1">
                    <span className="text-sm">
                      <i className="far fa-long-arrow-up" />
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {maxTemp}°C
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">
                      <i className="far fa-long-arrow-down" />
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {minTemp}°C
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-6">
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Wind</div>
                  <div className="text-sm text-gray-500">
                    {weatherData.wind.speed} m/h
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Humidity</div>
                  <div className="text-sm text-gray-500">
                    {weatherData.main.humidity}%
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Pressure</div>
                  <div className="text-sm text-gray-500">
                    {weatherData.main.pressure} hPa
                  </div>
                </div>
              </div>
            </div>
            <ForeCast />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
