import { useEffect, useState } from 'react';
import {
  ParsedData,
  parseLinkHeader,
} from 'src/components/utils/parseLinkHeader';
import { HouseGOT } from 'src/models/HouseGOT';

export const useFetchGOT = (
  region: string,
  page: string | undefined,
  pageSize: string
) => {
  const [houses, setHouses] = useState<HouseGOT[]>([]);
  const [parsedLink, serParsedLink] = useState<ParsedData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const apiResponseRaw = await fetch(
          `https://www.anapioficeandfire.com/api/houses/?${
            page && `page=${page}`
          }${pageSize && `&pageSize=${pageSize}`}${
            region && `&region=${region}`
          }`,
          { signal: controller.signal }
        );
        const linkHeader = apiResponseRaw.headers.get('Link');
        if (linkHeader) {
          serParsedLink(parseLinkHeader(linkHeader));
        }
        const apiResponse: HouseGOT[] = await apiResponseRaw.json();
        if (apiResponse.length === 0) {
          setError('House does not exist');
          console.warn('House does not exist');
          setIsLoading(false);
        } else {
          setHouses(apiResponse);
          setIsLoading(false);
        }
      } catch (e) {
        if (controller.signal.aborted) {
          console.warn('The user aborted the request');
          return;
        }
        const error = e as Error;
        setHouses([]);
        setError(error.message);
        console.warn(error);
      }
      setIsLoading(false);
    };

    fetchCharacters();

    return () => {
      controller.abort();
    };
  }, [region, page, pageSize]);

  return { houses, isLoading, error, parsedLink };
};
