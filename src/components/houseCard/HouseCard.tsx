// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'src/components/houseCard/HouseCard.module.scss';
// import { Context } from 'src/utils/context';
import { HouseGOT } from 'src/models/HouseGOT';
import { useAppDispatch } from 'src/hooks/hooks';
import { setHouseId } from 'src/redux/housesQuerySlice';

export interface CardProps {
  house: HouseGOT;
  // onCardClick: (houseID: string) => void;
}

export const HouseCard = (props: CardProps) => {
  // const { onCardClick } = useContext(Context);
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
      // onClick={() => {
      //   props.onCardClick(props.house.url);
      //   navigate(`house/${props.house.url.split('/')[5]}`);
      // }}
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
