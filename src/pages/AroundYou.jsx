import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
	const [country, setCountry] = useState('');
	const [loading, setLoading] = useState(true);
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsByCountryQuery(country);

	useEffect(() => {
		const fetchCountry = async () => {
			try {
				const res = await axios.get(
					`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`
				);
				setCountry(res?.data?.location?.country);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchCountry();
	}, [country]);

	if (isFetching || loading) return <Loader title="Loading song around you" />;

	if (error && country) return <Error />;

	return (
		<div className="flex flex-col">
			<h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You <span className='font-black'>{country}</span></h2>

			<div className="flex flex-wrap sm:justify-start justify-center gap-8">
				{data?.tracks.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data.tracks}
						i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default AroundYou;
