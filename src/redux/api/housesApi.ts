import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HouseGOT } from 'src/models/HouseGOT';
import { ParsedData, parseLinkHeader } from 'src/utils/parseLinkHeader';

type HousesResponse = {
  houses: HouseGOT[];
  parsedLink: ParsedData | null | undefined;
};

export const housesApi = createApi({
  reducerPath: 'housesApi',
  tagTypes: ['houses', 'house'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.anapioficeandfire.com/api/houses/',
  }),
  endpoints: (builder) => ({
    getHouses: builder.query<HousesResponse, string>({
      query: (query = '') => `?${query}`,
      providesTags: (result) =>
        result
          ? [
              // ...result.map(({ url })) => ({ type: 'houses' as const, url}),
              { type: 'houses', url: 'LIST' },
            ]
          : [{ type: 'houses', url: 'LIST' }],
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

export const { useGetHousesQuery, useGetHouseQuery } = housesApi;

export default housesApi.reducer;
