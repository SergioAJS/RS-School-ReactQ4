import styles from 'src/components/search/Search.module.scss';

interface SearchProps {
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  input: string;
}

export const Search = (props: SearchProps) => {
  return (
    <div>
      <form className={styles.form} onSubmit={props.handleSearch}>
        <label htmlFor="search">
          <input
            className={styles.search}
            type="search"
            name="search"
            id="search"
            placeholder="You can search by the region"
            onChange={props.onChange}
            value={props.input}
          />
        </label>
        <input className={styles.button} type="submit" value="Search" />
      </form>
    </div>
  );
};
