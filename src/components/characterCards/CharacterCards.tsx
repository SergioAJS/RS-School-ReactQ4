import { Component } from 'react';
import { CharacterCard } from 'src/components/characterCard/CharacterCard';
import { Loader } from 'src/components/loader/Loader';
import { Character } from 'src/models/Character';
import styles from 'src/components/characterCards/CharacterCards.module.scss';

interface CardsProps {
  searchValue: string;
}

interface CardsState {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
}

export class CharacterCards extends Component<CardsProps, CardsState> {
  constructor(props: CardsProps | Readonly<CardsProps>) {
    super(props);
    this.state = {
      characters: [],
      isLoading: true,
      isError: false,
    };
  }

  controller = new AbortController();

  fetchCharacters = async (characterName: string) => {
    try {
      this.setState({
        isLoading: true,
        isError: false,
      });
      const charactersRaw = await fetch(
        `https://rickandmortyapi.com/api/character${
          characterName && `/?name=${characterName}`
        }`,
        { signal: this.controller.signal }
      );
      if (!charactersRaw.ok) {
        this.setState({
          isError: true,
          isLoading: false,
        });
      } else {
        const characters = await charactersRaw.json();
        this.setState({
          characters: characters.results,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  async componentDidMount() {
    this.fetchCharacters(this.props.searchValue);
  }

  async componentDidUpdate(prevProps: CardsProps) {
    if (this.props.searchValue !== prevProps.searchValue) {
      this.fetchCharacters(this.props.searchValue);
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
        {this.state.isLoading ? (
          <Loader />
        ) : this.state.isError ? (
          <p>Character does not exist </p>
        ) : (
          <ul className={styles.cards}>
            {this.renderCards(this.state.characters)}
          </ul>
        )}
      </div>
    );
  }
}
