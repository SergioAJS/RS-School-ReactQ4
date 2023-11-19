import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'src/components/search/Search.module.scss';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import {
  FIRST_PAGE,
  setInputValue,
  setPage,
  setSearchValue,
} from 'src/redux/housesQuerySlice';

export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector((state) => state.housesQuery.inputValue);

  const onChangeInput = (event: React.FormEvent<HTMLInputElement>): void => {
    const input = event?.currentTarget;
    const value = input.value;
    dispatch(setInputValue(value));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = inputValue.trim();
    localStorage.setItem('searchValue-SergioAJS', searchValue);
    dispatch(setSearchValue(searchValue));
    dispatch(setPage(FIRST_PAGE));
    navigate('/');
  };

  useEffect(() => {
    dispatch(setInputValue(inputValue));
  }, [dispatch, inputValue]);

  return (
    <div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="search">
          <input
            className={styles.search}
            type="search"
            name="search"
            id="search"
            placeholder="You can search by the region"
            onChange={onChangeInput}
            value={inputValue}
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
