import { Component } from 'react';
import { Character } from 'src/models/Character';

export interface CardProps {
  character: Character;
}

export class CharacterCard extends Component<CardProps> {
  render() {
    return (
      <li
        title={`More info about ${this.props.character.name}`}
        data-cy="character-card"
      >
        <h3>{this.props.character.name}</h3>
        <img src={this.props.character.image} alt={this.props.character.name} />
        <p>Species: {this.props.character.species}</p>
      </li>
    );
  }
}
