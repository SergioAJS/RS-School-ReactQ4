import { useNavigate } from 'react-router-dom';
import styles from 'src/components/characterCard/CharacterCard.module.scss';
import { HouseGOT } from 'src/models/HouseGOT';

export interface CardProps {
  character: HouseGOT;
  onCardClick: (houseID: string) => void;
}

export const CharacterCard = (props: CardProps) => {
  const navigate = useNavigate();
  return (
    <li
      className={styles.card}
      onClick={() => {
        props.onCardClick(props.character.url);
        navigate(`house/${props.character.url.split('/')[5]}`);
      }}
      id={props.character.url}
      title={`More info about ${props.character.name}`}
    >
      <h3>{props.character.name}</h3>
      <p>Region: {props.character.region}</p>
    </li>
  );
};
