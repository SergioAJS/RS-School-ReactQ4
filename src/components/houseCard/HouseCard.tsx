import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'src/components/houseCard/HouseCard.module.scss';
import { Context } from 'src/components/utils/context';
import { HouseGOT } from 'src/models/HouseGOT';

export interface CardProps {
  house: HouseGOT;
}

export const HouseCard = (props: CardProps) => {
  const { onCardClick } = useContext(Context);
  const navigate = useNavigate();
  return (
    <li
      className={styles.card}
      onClick={() => {
        onCardClick(props.house.url);
        navigate(`house/${props.house.url.split('/')[5]}`);
      }}
      id={props.house.url}
      title={`More info about ${props.house.name}`}
    >
      <h3>{props.house.name}</h3>
      <p>Region: {props.house.region}</p>
    </li>
  );
};
