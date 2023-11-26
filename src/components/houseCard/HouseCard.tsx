import styles from 'src/components/houseCard/HouseCard.module.scss';
import { HouseGOT } from 'src/models/HouseGOT';

export interface CardProps {
  house: HouseGOT;
}

export const HouseCard = (props: CardProps) => {
  return (
    <li
      className={styles.card}
      id={props.house.url}
      title={`More info about ${props.house.name}`}
      data-testid="houseCard"
    >
      <h3>{props.house.name}</h3>
      <p>Region: {props.house.region}</p>
    </li>
  );
};
