import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
	const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    searchTerm && navigate(`/search/${searchTerm}`)
  }

  useEffect(() => {
    !searchTerm && navigate('/')
  }, [searchTerm])

	return (
		<form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
			<label htmlFor="search-field" className="sr-only">
				Search all songs
			</label>
			<div className="flex flex-rơ justify-start items-center">
				<FiSearch className="w-6 h-6 ml-4" onClick={handleSubmit}/>
				<input
					type="search"
					name="search-field"
					autoComplete="off"
					id="search-field"
					placeholder="Search"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
          className='flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4 focus:ring-0'
				/>
			</div>
		</form>
	);
};

export default Searchbar;
