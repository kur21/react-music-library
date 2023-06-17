import { useNavigate } from 'react-router-dom';
import { imgDf } from '../assets';

const ArtistCard = ({ track }) => {
	const navigate = useNavigate();

	return (
		<div
			className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
			onClick={() => navigate(`/artists/${track?.artists[0].adamid || track?.adamid}`)}
		>
			<img src={track?.images?.background || track?.avatar || imgDf} alt="artist" className="w-full h-56 rounded-lg" />
			<p className="mt-4 font-semibold text-lg text-white">{track?.subtitle || track?.name}</p>
		</div>
	);
};

export default ArtistCard;
