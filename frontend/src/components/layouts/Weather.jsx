import React, { useEffect, useState } from "react";
import slugify from "slugify";
import { iller as provinces } from "../../constants/constants";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProvince, setSelectedProvince] = useState(
    localStorage.getItem("selectedWeatherCity")
      ? localStorage.getItem("selectedWeatherCity")
      : "Ankara"
  );

  const handleChange = (event) => {
    setSelectedProvince(event.target.value);
    localStorage.setItem("selectedWeatherCity", event.target.value);
  };

  const apiKey = process.env.REACT_APP_WEATHER_API;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${slugify(
            selectedProvince,
            { lower: true }
          )}&aqi=no`
        );

        if (!response.ok) {
          throw new Error("Hava durumu verileri alınamadı");
        }

        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedProvince, apiKey]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 items-center">
        <img
          src={weatherData.current.condition.icon}
          alt="weather_icon"
          width={40}
        />
        <p className="text-sm">{weatherData.current.temp_c}°C</p>
      </div>

      <div>
        <select
          id="province"
          value={selectedProvince}
          onChange={handleChange}
          className="bg-transparent rounded p-2 w-4/5"
        >
          {provinces.map((province) => (
            <option key={province} value={province} className="text-black">
              {province}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Weather;
