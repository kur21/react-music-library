import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard, ArtistCard } from '../components';

const Search = () => {
  const { searchTerm } = useParams()
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits?.map(item => item.track)
  const artists = data?.artists?.hits?.map(item => item.artist)

	if (isFetching) return <Loader title="Loading top charts" />;

	if (error) return <Error />;

	return (
		<div className="flex flex-col">
			<h2 className="font-bold text-3xl text-white text-center sm:text-left mt-4 mb-10">Showing results for <span className='font-black'>{searchTerm}</span></h2>

      <div className='mb-8'>
        <h5 className='font-semibold text-xl text-white text-center sm:text-left mb-4'>Songs:</h5>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {songs ? songs?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data.tracks}
              i={i}
            />
          )) : <p className='text-gray-400 text-center sm:text-left'>No matching song</p>}
        </div>
      </div>

      <div>
        <h5 className='font-semibold text-xl text-white text-center sm:text-left mb-4'>Artists:</h5>   
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {artists ? artists?.map((track) => (
            <ArtistCard key={track.adamid} track={track}/>
          )) : <p className='text-gray-400 text-center sm:text-left'>No matching artist</p>}
        </div>
      </div>
		</div>
	);
};

export default Search;
