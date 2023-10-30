import styles from 'src/components/characterCard/CharacterCard.module.scss';
import { Character } from 'src/models/Character';

export interface CardProps {
  character: Character;
}

export const CharacterCard = (props: CardProps) => {
  return (
    <li className={styles.card}>
      <h3>{props.character.name}</h3>
      <img
        className={styles.image}
        src={props.character.image}
        alt={props.character.name}
      />
      <p>Species: {props.character.species}</p>
    </li>
  );
};
