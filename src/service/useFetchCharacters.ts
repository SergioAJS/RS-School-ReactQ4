import { useEffect, useState } from 'react';
import { ApiResponse } from 'src/models/ApiResponse';
import { Character } from 'src/models/Character';

const FIRST_PAGE = 1;

export const useFetchCharacters = (characterName: string) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pages, setPages] = useState<number>(FIRST_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const apiResponseRaw = await fetch(
          `https://rickandmortyapi.com/api/character/?page=1${
            characterName && `&name=${characterName}`
          }`,
          { signal: controller.signal }
        );
        if (!apiResponseRaw.ok) {
          setError('Character does not exist');
          console.warn('Character does not exist');
          setIsLoading(false);
        } else {
          const apiResponse: ApiResponse = await apiResponseRaw.json();
          setCharacters(apiResponse.results);
          setPages(apiResponse.info.pages);
          setIsLoading(false);
        }
      } catch (e) {
        if (controller.signal.aborted) {
          console.warn('The user aborted the request');
          return;
        }
        const error = e as Error;
        setCharacters([]);
        setError(error.message);
        console.warn(error);
      }
      setIsLoading(false);
    };

    fetchCharacters();

    return () => {
      controller.abort();
    };
  }, [characterName]);

  return { characters, pages, isLoading, error };
};
