import { CharacterCard } from 'src/components/characterCard/CharacterCard';
import styles from 'src/components/characterCards/CharacterCards.module.scss';
import { Loader } from 'src/components/loader/Loader';
import { Character } from 'src/models/Character';
import { useFetchCharacters } from 'src/service/useFetchCharacters';

interface CardsProps {
  searchValue: string;
}

export const CharacterCards = (props: CardsProps) => {
  const { characters, isLoading, error } = useFetchCharacters(
    props.searchValue
  );

  const renderCards = (characters: Character[]) => {
    if (characters)
      return characters.map((character) => (
        <CharacterCard character={character} key={character.id} />
      ));
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className={styles.cards}>{renderCards(characters)}</ul>
      )}
    </div>
  );
};
