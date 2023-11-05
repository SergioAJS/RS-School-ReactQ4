import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { HouseCards } from 'src/components/houseCards/HouseCards';
import { Search } from 'src/components/search/Search';
import { TestErrorBoundary } from 'src/components/testErrorBoundary/TestErrorBoundary';
import styles from 'src/pages/Main.module.scss';
import { useFetchGOT } from 'src/service/useFetchGOT';

export type ContextType = {
  houseID: string;
};

const FIRST_PAGE = '1';
const DEFAULT_NUMBER_OF_ITEMS = '10';

export const Main = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('searchValue-SergioAJS') || ''
  );
  const [input, setInput] = useState<string>(
    localStorage.getItem('searchValue-SergioAJS') || ''
  );
  const [search, setSearch] = useSearchParams();
  const queryPage = search.get('page');
  const queryNumberOfItems = search.get('numberOfItems');
  const [page, setPage] = useState<string | undefined>(
    queryPage || localStorage.getItem('page-SergioAJS') || FIRST_PAGE
  );
  const [numberOfItems, setNumberOfItems] = useState(
    queryNumberOfItems ||
      localStorage.getItem('numberOfItems-SergioAJS') ||
      DEFAULT_NUMBER_OF_ITEMS
  );
  const { houses, isLoading, error, parsedLink } = useFetchGOT(
    searchValue,
    page,
    numberOfItems
  );

  useEffect(() => {
    if (page) search.set('page', page);
    if (numberOfItems) search.set('numberOfItems', numberOfItems);
    setSearch(search);
  }, [numberOfItems, page, search, setSearch]);

  const onChangePage = (event: SyntheticEvent) => {
    const target = event.target as HTMLButtonElement;
    const slice = (link: string | undefined) => {
      if (link) {
        const result = link.split('&').slice(-2, -1)[0].split('=')[1];
        search.set('page', result);
        localStorage.setItem('page-SergioAJS', result);
        setPage(result);
        setSearch(search);
        navigate('/');
      }
    };
    switch (target.value) {
      case 'First':
        slice(parsedLink?.first);
        break;
      case 'Last':
        slice(parsedLink?.last);
        break;
      case 'Prev':
        slice(parsedLink?.prev);
        break;
      case 'Next':
        slice(parsedLink?.next);
        break;
    }
  };

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target.value;
    select
      ? search.set('numberOfItems', select)
      : search.delete('numberOfItems');
    search.set('page', FIRST_PAGE);
    setSearch(search);
    setNumberOfItems(select);
    setPage(FIRST_PAGE);
    localStorage.setItem('numberOfItems-SergioAJS', select);
    navigate('/');
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput(input.trim());
    setSearchValue(input.trim());
    localStorage.setItem('searchValue-SergioAJS', input.trim());
    search.set('page', FIRST_PAGE);
    setSearch(search);
    setPage(FIRST_PAGE);
  };

  const [houseID, setHouseID] = useState(
    localStorage.getItem('houseID-SergioAJS') || ''
  );

  const onCardClick = (houseID: string) => {
    const getHouseID = houseID.split('/')[5];
    localStorage.setItem('houseID-SergioAJS', getHouseID);
    setHouseID(getHouseID);
  };

  return (
    <div className={styles.main}>
      <Search handleSearch={handleSearch} onChange={onChange} input={input} />
      <TestErrorBoundary />
      <div className={styles.pagination}>
        <button
          className={styles.button}
          type="submit"
          onClick={onChangePage}
          value={'First'}
        >
          First
        </button>
        <button
          disabled={!parsedLink?.prev}
          className={styles.button}
          type="submit"
          onClick={onChangePage}
          value={'Prev'}
        >
          Prev
        </button>
        <p>Page: {page}</p>
        <button
          disabled={!parsedLink?.next}
          className={styles.button}
          type="submit"
          onClick={onChangePage}
          value={'Next'}
        >
          Next
        </button>
        <button
          className={styles.button}
          type="submit"
          onClick={onChangePage}
          value={'Last'}
        >
          Last
        </button>
      </div>
      <select
        name="select"
        id="selectNumberOfItems"
        value={numberOfItems}
        onChange={onSelect}
      >
        <option value="">--Number of Items--</option>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
      </select>
      <div className={styles.cardsContainer}>
        <HouseCards
          houses={houses}
          isLoading={isLoading}
          error={error}
          onCardClick={onCardClick}
        />
        <Outlet context={{ houseID } satisfies ContextType} />
      </div>
    </div>
  );
};
