import { Component } from 'react';
import { Character } from 'src/models/Character';
import styles from 'src/components/characterCard/CharacterCard.module.scss';

export interface CardProps {
  character: Character;
}

export class CharacterCard extends Component<CardProps> {
  render() {
    return (
      <li className={styles.card}>
        <h3>{this.props.character.name}</h3>
        <img
          className={styles.image}
          src={this.props.character.image}
          alt={this.props.character.name}
        />
        <p>Species: {this.props.character.species}</p>
      </li>
    );
  }
}
