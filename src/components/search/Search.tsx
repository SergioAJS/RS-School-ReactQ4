import { useContext } from 'react';
import styles from 'src/components/search/Search.module.scss';
import { Context } from 'src/components/utils/context';

export const Search = () => {
  const { input, onChange, handleSearch } = useContext(Context);

  return (
    <div>
      <form className={styles.form} onSubmit={handleSearch}>
        <label htmlFor="search">
          <input
            className={styles.search}
            type="search"
            name="search"
            id="search"
            placeholder="You can search by the region"
            onChange={onChange}
            value={input}
            data-testid="input"
          />
        </label>
        <input
          className={styles.button}
          type="submit"
          value="Search"
          data-testid="search"
        />
      </form>
    </div>
  );
};
