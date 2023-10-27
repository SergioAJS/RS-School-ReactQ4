import { Component } from 'react';
import styles from './Search.module.scss';

interface SearchState {
  input: string;
}

export class Search extends Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = {
      input: localStorage.getItem('searchInput') || '',
    };
  }

  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      input: event.currentTarget.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('searchInput', this.state.input);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">
            <input
              className={styles.search}
              type="search"
              name="search"
              id="search"
              placeholder="You can search here"
              onChange={this.onChange}
              value={this.state.input}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
        <p>{this.state.input}</p>
      </div>
    );
  }
}
