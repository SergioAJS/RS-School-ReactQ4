import styles from 'src/components/characterCard/CharacterCard.module.scss';
// import { Character } from 'src/models/Character';
import { HouseGOT } from 'src/models/HouseGOT';

export interface CardProps {
  character: HouseGOT;
}

export const CharacterCard = (props: CardProps) => {
  return (
    <li className={styles.card}>
      <h3>{props.character.name}</h3>
      {/* <img
        className={styles.image}
        src={props.character.image}
        alt={props.character.name}
      /> */}
      <p>Region: {props.character.region}</p>
      <p>Coat Of Arms: {props.character.coatOfArms}</p>
      <p>Overlord: {props.character.overlord}</p>
    </li>
  );
};
