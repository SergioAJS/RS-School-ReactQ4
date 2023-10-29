import { Component } from 'react';
import styles from 'src/components/search/Search.module.scss';

interface SearchProps {
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  input: string;
}

export class Search extends Component<SearchProps> {
  render() {
    return (
      <div>
        <form className={styles.form} onSubmit={this.props.handleSearch}>
          <label htmlFor="search">
            <input
              className={styles.search}
              type="search"
              name="search"
              id="search"
              placeholder="You can search by the character name"
              onChange={this.props.onChange}
              value={this.props.input}
            />
          </label>
          <input className={styles.button} type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
