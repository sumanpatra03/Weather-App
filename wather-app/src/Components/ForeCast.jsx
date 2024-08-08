/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CloudIcon from "../assets/icon/cloude.png";
import RainIcon from "../assets/icon/rain.png";
import SunIcon from "../assets/icon/sun.png";

const ForeCast = () => {
  const { cityName } = useParams();

  const [foreCastData, setForeCastData] = useState([]);
  const [wForeIcon, setWForeIcon] = useState(SunIcon);
  const [loding, setLoding] = useState(true);

  // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  useEffect(() => {
    const fetchForeCastData = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const dailyForecast = res.data.list.filter(
          (item, index) => index % 8 === 0
        );
        setForeCastData(dailyForecast);
        setLoding(false);
        console.log(dailyForecast);
      } catch (error) {
        console.log("fetching weather error", error);
      }
    };
    fetchForeCastData();
  }, [cityName]);

  return (
    <div className=" p-2">
      <h1 className="text-white font-bold text-3xl mb-2">Forecast</h1>
      {loding ? (
        <p>loding...</p>
      ) : (
        <div className="flex xl:gap-5 flex-col xl:flex-row">
          {foreCastData.map((day, index) => {
            let weatherIcon;

            if (day.weather[0].main === "Clouds") {
              weatherIcon = CloudIcon;
            } else if (day.weather[0].main === "Rain") {
              weatherIcon = RainIcon;
            } else if (day.weather[0].main === "Clear") {
              weatherIcon = SunIcon;
            }
            const date = new Date(day.dt_txt);
            const foreCastDate = date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <div
                key={index}
                className="flex flex-col xl:gap-2 items-center text-white"
              >
                <p>{foreCastDate}</p>
                <img src={weatherIcon} alt="" className="w-[30px]" />
                <p className="font-semibold">
                  Temprature:{(day.main.temp - 273.15).toFixed(1)} °C
                </p>
                <p className="font-semibold">
                  max-Temprature:{(day.main.temp_max - 273.15).toFixed(1)} °C
                </p>
                <p className="font-semibold">
                  min-Temprature:{(day.main.temp_min - 273.15).toFixed(1)} °C
                </p>
                <p>{day.weather[0].description}</p>
                <p>{(day.pop * 100).toFixed()}%</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ForeCast;
