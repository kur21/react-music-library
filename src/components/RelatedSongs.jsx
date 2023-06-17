import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => {
	return (
		<div className="flex flex-col">
			<h1 className="font-bold text-3xl text-white">Related Songs:</h1>

			<div className="mt-6 w-full flex flex-col">
				{data ? (
					data?.map((song, i) => (
						<SongBar
							key={`${song.key || song.id}-${artistId}`}
							song={song}
							i={i}
							artistId={artistId}
							isPlaying={isPlaying}
							handlePauseClick={handlePauseClick}
							handlePlayClick={handlePlayClick}
						/>
					))
				) : (
					<p className="text-gray-400 text-base my-1">Sorry, no related songs found.</p>
				)}
			</div>
		</div>
	);
};

export default RelatedSongs;
