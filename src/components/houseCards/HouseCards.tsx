import { useContext } from 'react';
import { HouseCard } from 'src/components/houseCard/HouseCard';
import styles from 'src/components/houseCards/HouseCards.module.scss';
import { Loader } from 'src/components/loader/Loader';
import { Context } from 'src/utils/context';
import { HouseGOT } from 'src/models/HouseGOT';

interface CardsProps {
  isLoading: boolean;
  isError: boolean;
  // onCardClick: (houseID: string) => void;
}

export const HouseCards = (props: CardsProps) => {
  const { houses } = useContext(Context);

  const renderCards = (houses: HouseGOT[] | undefined) => {
    if (houses)
      return houses.map((house) => (
        <HouseCard
          house={house}
          key={house.url}
          // onCardClick={props.onCardClick}
        />
      ));
  };

  return (
    <div>
      {props.isLoading ? (
        <Loader />
      ) : props.isError ? (
        <p>{'error'}</p>
      ) : (
        <>
          <ul className={styles.cards}>{renderCards(houses)}</ul>
        </>
      )}
    </div>
  );
};
