import { Component } from 'react';
import { CharacterCards } from 'src/components/characterCards/CharacterCards';
import { Search } from 'src/components/search/Search';
import { TestErrorBoundary } from 'src/components/testErrorBoundary/TestErrorBoundary';
import styles from 'src/pages/Main.module.scss';

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
      searchValue: this.state.input.trim(),
      input: this.state.input.trim(),
    });
    localStorage.setItem('searchValue', this.state.input.trim());
  };

  render() {
    return (
      <div className={styles.main}>
        <Search
          handleSearch={this.handleSearch}
          onChange={this.onChange}
          input={this.state.input}
        />
        <TestErrorBoundary />
        <CharacterCards searchValue={this.state.searchValue} />
      </div>
    );
  }
}
