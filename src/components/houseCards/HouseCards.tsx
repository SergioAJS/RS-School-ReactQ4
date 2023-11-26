import { HousesResponse } from 'src/redux/api/housesApi';
import { HouseCard } from 'src/components/houseCard/HouseCard';
import styles from 'src/components/houseCards/HouseCards.module.scss';
import { HouseGOT } from 'src/models/HouseGOT';

interface HouseCardsProps {
  data: HousesResponse;
}

export const HouseCards = (props: HouseCardsProps) => {
  const renderCards = (houses: HouseGOT[] | undefined) => {
    if (houses)
      return houses.map((house) => <HouseCard house={house} key={house.url} />);
  };

  return (
    <div>
      houses
      <>
        <ul className={styles.cards}>{renderCards(props.data?.houses)}</ul>
      </>
    </div>
  );
};
