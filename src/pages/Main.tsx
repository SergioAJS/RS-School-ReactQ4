import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { CharacterCards } from 'src/components/characterCards/CharacterCards';
import { Search } from 'src/components/search/Search';
import { TestErrorBoundary } from 'src/components/testErrorBoundary/TestErrorBoundary';
import styles from 'src/pages/Main.module.scss';
import { useFetchGOT } from 'src/service/useFetchGOT';

const FIRST_PAGE = '1';
const DEFAULT_NUMBER_OF_ITEMS = '10';

export const Main = () => {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('searchValue-SergioAJS') || ''
  );
  const [input, setInput] = useState<string>(
    localStorage.getItem('searchValue-SergioAJS') || ''
  );
  const [search, setSearch] = useSearchParams();
  const queryPage = search.get('page') || FIRST_PAGE;
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

  return (
    <div className={styles.main}>
      <Search handleSearch={handleSearch} onChange={onChange} input={input} />
      <TestErrorBoundary />
      <div className={styles.pagination}>
        <button type="submit" onClick={onChangePage} value={'First'}>
          First
          {parsedLink?.first && <Link to={parsedLink?.first} />}
        </button>
        <button type="submit" onClick={onChangePage} value={'Prev'}>
          Prev
          {parsedLink?.first && <Link to={parsedLink?.first} />}
        </button>
        <p>Page: {page}</p>
        <button type="submit" onClick={onChangePage} value={'Next'}>
          Next
          {parsedLink?.first && <Link to={parsedLink?.first} />}
        </button>
        <button type="submit" onClick={onChangePage} value={'Last'}>
          Last
          {parsedLink?.last && <Link to={parsedLink?.last} />}
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
      {parsedLink && <p>{parsedLink.first}</p>}
      {parsedLink && <p>{parsedLink.last}</p>}
      {parsedLink && <p>{parsedLink.prev}</p>}
      {parsedLink && <p>{parsedLink.next}</p>}

      <div className={styles.cardsContainer}>
        <CharacterCards houses={houses} isLoading={isLoading} error={error} />
        <Outlet />
      </div>
    </div>
  );
};
