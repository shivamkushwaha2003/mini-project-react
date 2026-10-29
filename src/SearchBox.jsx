import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getWeatherInfo = async (cityName) => {
        const locationParams = new URLSearchParams({
            name: cityName,
            count: '1',
            language: 'en',
            format: 'json',
        });
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?${locationParams}`,
        );
        if (!locationResponse.ok) {
            throw new Error('Could not search for that city. Please try again.');
        }
        const locationData = await locationResponse.json();
        const location = locationData.results?.[0];

        if (!location) {
            throw new Error('City not found. Check the spelling and try again.');
        }

        const weatherParams = new URLSearchParams({
            latitude: String(location.latitude),
            longitude: String(location.longitude),
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code',
            daily: 'temperature_2m_max,temperature_2m_min',
            timezone: 'auto',
        });
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?${weatherParams}`,
        );
        if (!weatherResponse.ok) {
            throw new Error('Could not retrieve weather right now. Please try again.');
        }
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;
        const daily = weatherData.daily;

        if (!current || !daily) {
            throw new Error('The weather service returned an unexpected response.');
        }

        const weatherDescriptions = {
            0: 'clear sky',
            1: 'mainly clear',
            2: 'partly cloudy',
            3: 'overcast',
            45: 'fog',
            48: 'rime fog',
            51: 'light drizzle',
            53: 'moderate drizzle',
            55: 'dense drizzle',
            56: 'light freezing drizzle',
            57: 'dense freezing drizzle',
            61: 'slight rain',
            63: 'moderate rain',
            65: 'heavy rain',
            66: 'light freezing rain',
            67: 'heavy freezing rain',
            71: 'slight snow',
            73: 'moderate snow',
            75: 'heavy snow',
            77: 'snow grains',
            80: 'slight rain showers',
            81: 'moderate rain showers',
            82: 'violent rain showers',
            85: 'slight snow showers',
            86: 'heavy snow showers',
            95: 'thunderstorm',
            96: 'thunderstorm with slight hail',
            99: 'thunderstorm with heavy hail',
        };

        return {
            city: [location.name, location.country].filter(Boolean).join(', '),
            temp: current.temperature_2m,
            tempMin: daily.temperature_2m_min?.[0],
            tempMax: daily.temperature_2m_max?.[0],
            humidity: current.relative_humidity_2m,
            feelsLike: current.apparent_temperature,
            weather: weatherDescriptions[current.weather_code] || 'unknown conditions',
        };
    };

    const handleChange = (evt) => {
        setCity(evt.target.value);
        setError('');
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const cityName = city.trim();
        if (!cityName) return;

        setIsLoading(true);
        setError('');
        try {
            const newInfo = await getWeatherInfo(cityName);
            updateInfo(newInfo);
            setCity('');
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : 'Unable to retrieve weather. Please try again.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <br /><br />
                <Button variant="contained" type="submit" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </Button>
                {error && <p className="SearchBox-error" role="alert">{error}</p>}
            </form>
        </div>
    );
}