import { useState } from 'react';
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelsLike: 19.69,
        temp: 20.69,
        tempMax: 21.69,
        tempMin: 18.69,
        humidity: 82,
        weather: "clear sky",
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    );
}