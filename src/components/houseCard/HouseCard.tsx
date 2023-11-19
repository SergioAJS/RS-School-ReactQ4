import { useNavigate } from 'react-router-dom';
import styles from 'src/components/houseCard/HouseCard.module.scss';
import { useAppDispatch } from 'src/hooks/hooks';
import { HouseGOT } from 'src/models/HouseGOT';
import { setHouseId } from 'src/redux/housesQuerySlice';

export interface CardProps {
  house: HouseGOT;
}

export const HouseCard = (props: CardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const houseId = props.house.url.split('/')[5];

  const handleCardClick = () => {
    dispatch(setHouseId(houseId));
    localStorage.setItem('houseID-SergioAJS', houseId);
    navigate(`house/${houseId}`);
  };

  return (
    <li
      className={styles.card}
      onClick={handleCardClick}
      id={props.house.url}
      title={`More info about ${props.house.name}`}
      data-testid="houseCard"
    >
      <h3>{props.house.name}</h3>
      <p>Region: {props.house.region}</p>
    </li>
  );
};
