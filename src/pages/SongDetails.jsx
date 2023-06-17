import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { songid } = useParams();
	const {
		data: songData,
		isFetching: isFetchingSongDetails,
		error: errorSongDetails,
	} = useGetSongDetailsQuery(songid);
	const {
		data: relatedData,
		isFetching: isFetchingRelatedSongs,
		error: errorRelatedSongs,
	} = useGetSongRelatedQuery(songid);

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />;

	if (Object.keys(songData).length === 0 && songData.constructor === Object) return <Error msg='Sorry, song not found.'/>
	if (errorSongDetails || errorRelatedSongs) return <Error />;

	return (
		<div className="flex flex-col">
			<DetailsHeader artistId="" songData={songData} />

			<div className="mb-10">
				<h2 className="text-white text-xl font-bold">Lyrics:</h2>
				<div className="mt-5">
					{songData?.sections[1]?.type === 'LYRICS' ? (
						songData?.sections[1]?.text.map((line, i) => (
							<p className="text-gray-400 text-base my-1" key={i}>
								{line}
							</p>
						))
					) : (
						<p className="text-gray-400 text-base my-1">Sorry, no lyrics found.</p>
					)}
				</div>
			</div>

			<RelatedSongs
				data={relatedData.tracks}
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick}
			/>
		</div>
	);
};

export default SongDetails;
