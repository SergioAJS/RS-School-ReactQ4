import { useEffect, useState } from 'react';
import {
  ParsedData,
  parseLinkHeader,
} from 'src/components/utils/parseLinkHeader';
import { HouseGOT } from 'src/models/HouseGOT';

export const useFetchGOTHouse = (houseID: string) => {
  const [house, setHouse] = useState<HouseGOT | null>();
  const [parsedLink, serParsedLink] = useState<ParsedData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const apiResponseRaw = await fetch(
          `https://www.anapioficeandfire.com/api/houses/${
            houseID && `${houseID}`
          }`,
          { signal: controller.signal }
        );
        const linkHeader = apiResponseRaw.headers.get('Link');
        if (linkHeader) {
          serParsedLink(parseLinkHeader(linkHeader));
        }
        const apiResponse: HouseGOT = await apiResponseRaw.json();
        if (!apiResponse) {
          setError('Character does not exist');
          console.warn('Character does not exist');
          setIsLoading(false);
        } else {
          setHouse(apiResponse);
          setIsLoading(false);
        }
      } catch (e) {
        if (controller.signal.aborted) {
          console.warn('The user aborted the request');
          return;
        }
        const error = e as Error;
        setHouse(null);
        setError(error.message);
        console.warn(error);
      }
      setIsLoading(false);
    };

    fetchCharacters();

    return () => {
      controller.abort();
    };
  }, [houseID]);

  return { house, isLoading, error, parsedLink };
};
