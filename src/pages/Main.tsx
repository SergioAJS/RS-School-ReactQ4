import { Component } from 'react';
import { Search } from '../components/search/Search';
import { CharacterCards } from '../components/characterCards/CharacterCards';

interface MainState {
  searchValue: string;
  input: string;
}

export class Main extends Component<object, MainState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem('searchValue') || '',
      input: localStorage.getItem('searchValue') || '',
    };
  }

  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      input: event.currentTarget.value,
    });
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      searchValue: this.state.input,
    });
    localStorage.setItem('searchValue', this.state.input);
  };

  render() {
    return (
      <div>
        <Search
          handleSearch={this.handleSearch}
          onChange={this.onChange}
          input={this.state.input}
        />
        <CharacterCards searchValue={this.state.searchValue} />
      </div>
    );
  }
}
