// import { Link } from 'react-router-dom';
import { CharacterCard } from 'src/components/characterCard/CharacterCard';
import styles from 'src/components/characterCards/CharacterCards.module.scss';
import { Loader } from 'src/components/loader/Loader';
// import { Character } from 'src/models/Character';
import { HouseGOT } from 'src/models/HouseGOT';
// import { useFetchCharacters } from 'src/service/useFetchCharacters';
import { useFetchGOT } from 'src/service/useFetchGOT';

interface CardsProps {
  searchValue: string;
  page: string | undefined;
  pageSize: string;
}

export const CharacterCards = (props: CardsProps) => {
  const { houses, isLoading, error } = useFetchGOT(
    props.searchValue,
    props.page,
    props.pageSize
  );

  const renderCards = (characters: HouseGOT[]) => {
    if (characters)
      return characters.map((character) => (
        <CharacterCard character={character} key={character.url} />
      ));
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <ul className={styles.cards}>{renderCards(houses)}</ul>
        </>
      )}
    </div>
  );
};
