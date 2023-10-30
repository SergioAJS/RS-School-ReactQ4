import { useEffect, useState } from 'react';
import { Character } from 'src/models/Character';

export const useFetchCharacters = (characterName: string) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const charactersRaw = await fetch(
          `https://rickandmortyapi.com/api/character/?page=1${
            characterName && `&name=${characterName}`
          }`,
          { signal: controller.signal }
        );
        if (!charactersRaw.ok) {
          setError('Character does not exist');
          console.warn('Character does not exist');
          setIsLoading(false);
        } else {
          const characters = await charactersRaw.json();
          setCharacters(characters.results);
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

  return { characters, isLoading, error };
};
