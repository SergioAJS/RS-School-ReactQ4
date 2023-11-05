import { HouseCard } from 'src/components/houseCard/HouseCard';
import styles from 'src/components/houseCards/HouseCards.module.scss';
import { Loader } from 'src/components/loader/Loader';
import { HouseGOT } from 'src/models/HouseGOT';

interface CardsProps {
  houses: HouseGOT[];
  isLoading: boolean;
  error: string | null;
  onCardClick: (houseID: string) => void;
}

export const HouseCards = (props: CardsProps) => {
  const renderCards = (houses: HouseGOT[]) => {
    if (houses)
      return houses.map((house) => (
        <HouseCard
          house={house}
          key={house.url}
          onCardClick={props.onCardClick}
        />
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
