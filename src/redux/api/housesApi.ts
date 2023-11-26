import { HouseGOT } from 'src/models/HouseGOT';
import { ParsedData, parseLinkHeader } from 'src/utils/parseLinkHeader';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export type HousesResponse = {
  houses: HouseGOT[];
  parsedLink: ParsedData | undefined;
};

export const housesApi = createApi({
  // reducerPath: 'housesApi',
  tagTypes: ['houses', 'house'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.anapioficeandfire.com/api/houses/',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getHouses: builder.query<HousesResponse, string>({
      query: (query = '') => `?${query}`,
      transformResponse: (response: HouseGOT[], meta) => {
        const linkHeaderRaw = meta?.response?.headers.get('Link');
        const parsedLink = parseLinkHeader(linkHeaderRaw);
        const houses = response;
        return { houses, parsedLink };
      },
    }),
    getHouse: builder.query<HouseGOT, string>({
      query: (id) => `${id && `${id}`}`,
    }),
  }),
});

export const {
  useGetHousesQuery,
  useGetHouseQuery,
  util: { getRunningQueriesThunk },
} = housesApi;

export default housesApi.reducer;
