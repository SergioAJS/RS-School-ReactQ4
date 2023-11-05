import { CharacterCard } from 'src/components/characterCard/CharacterCard';
import styles from 'src/components/characterCards/CharacterCards.module.scss';
import { Loader } from 'src/components/loader/Loader';
import { HouseGOT } from 'src/models/HouseGOT';

interface CardsProps {
  houses: HouseGOT[];
  isLoading: boolean;
  error: string | null;
}

export const CharacterCards = (props: CardsProps) => {
  const renderCards = (houses: HouseGOT[]) => {
    if (houses)
      return houses.map((house) => (
        <CharacterCard character={house} key={house.url} />
      ));
  };

  return (
    <div>
      {props.isLoading ? (
        <Loader />
      ) : props.error ? (
        <p>{props.error}</p>
      ) : (
        <>
          <ul className={styles.cards}>{renderCards(props.houses)}</ul>
        </>
      )}
    </div>
  );
};
