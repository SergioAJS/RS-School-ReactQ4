import { Component } from 'react';
import { CharacterCard } from '../characterCard/CharacterCard';
import { Character } from '../../models/Character';

interface CardsProps {
  searchValue: string;
}

interface CardsState {
  characters: Character[];
}

export class CharacterCards extends Component<CardsProps, CardsState> {
  constructor(props: CardsProps | Readonly<CardsProps>) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  controller = new AbortController();

  fetchCharacters = async (characterName: string) => {
    const charactersRaw = await fetch(
      `https://rickandmortyapi.com/api/character${
        characterName && `/?name=${characterName}`
      }`,
      { signal: this.controller.signal }
    );
    const characters = await charactersRaw.json();
    this.setState({
      characters: characters.results,
    });
  };

  async componentDidMount() {
    try {
      this.fetchCharacters(this.props.searchValue);
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidUpdate(prevProps: CardsProps) {
    try {
      if (this.props.searchValue !== prevProps.searchValue) {
        this.fetchCharacters(this.props.searchValue);
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount(): void {
    this.controller.abort;
  }

  renderCards = (characters: Character[]) => {
    if (characters)
      return characters.map((character) => (
        <CharacterCard character={character} key={character.id} />
      ));
  };

  render() {
    return (
      <div>
        <ul>{this.renderCards(this.state.characters)}</ul>
      </div>
    );
  }
}
