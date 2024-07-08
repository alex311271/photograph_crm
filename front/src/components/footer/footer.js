import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Weather = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 1.5;
`;

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');
	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Saint Petersburg,ru&units=metric&lang=ru&appid=1b9eb1494de1f419198fce90c5f46c4e',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<footer className={className}>
			<div>
				<Link to={'/'}>Связаться с разработчиками</Link>
			</div>
			<Weather>
				<div>
					{city} {new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature} градусов, {weather}
				</div>
			</Weather>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: end;
	width: 1200px;
	height: 120px;
	padding: 20px;
	color: #fff;
	background-color: #3b2f10;
`;
