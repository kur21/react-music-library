// https://rapidapi.com/apidojo/api/shazam/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
	reducerPath: 'shazamCoreAp',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam.p.rapidapi.com',
		prepareHeaders: (headers) => {
			headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: () => `/charts/track`}),
		getSongsByGenre: builder.query({ query: (genre) => `/charts/track?listId=genre-global-chart-${genre}`}),
    getSongsByCountry: builder.query({ query: (countryCode) => `/charts/track?listId=ip-country-chart-${countryCode}`}),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}`}),
    getArtistDetails: builder.query({ query: (artistId) => `/artists/get-summary?id=${artistId}`}),
    getSongDetails: builder.query({ query: (songid) => `/songs/get-details?key=${songid}`}),
    getSongRelated: builder.query({ query: (songid) => `/songs/list-recommendations?key=${songid}`}),
	}),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery
} = shazamCoreApi