// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { HouseCards } from 'src/components/houseCards/HouseCards';
import { Pagination } from 'src/components/pagination/Pagination';
import { Search } from 'src/components/search/Search';
import { Select } from 'src/components/select/Select';
import { TestErrorBoundary } from 'src/components/testErrorBoundary/TestErrorBoundary';
// import { Context } from 'src/utils/context';
import styles from 'src/pages/Main.module.scss';
// import { useFetchGOT } from 'src/service/useFetchGOT';
// import { switchPages } from 'src/utils/switchPages';
// import { useGetHousesQuery } from 'src/redux';
import { useAppSelector } from 'src/hooks/hooks';

export type ContextType = {
  houseId: string;
};

// const FIRST_PAGE = '1';
const DEFAULT_NUMBER_OF_ITEMS = '10';

export const Main = () => {
  // const navigate = useNavigate();
  const houseId = useAppSelector((state) => state.housesQuery.houseId);
  // const page = useAppSelector((state) => state.housesQuery.page);
  // const numberOfItems = useAppSelector(
  //   (state) => state.housesQuery.numberOfItems
  // );
  // const [searchValue, setSearchValue] = useState<string>(
  //   localStorage.getItem('searchValue-SergioAJS') || ''
  // );
  // const [input, setInput] = useState<string>(
  //   localStorage.getItem('searchValue-SergioAJS') || ''
  // );
  // const [search, setSearch] = useSearchParams();
  // const queryPage = search.get('page');
  // const queryNumberOfItems = search.get('numberOfItems');
  // const [page, setPage] = useState<string | undefined>(
  //   queryPage || localStorage.getItem('page-SergioAJS') || FIRST_PAGE
  // );
  // const [numberOfItems, setNumberOfItems] = useState(
  //   queryNumberOfItems ||
  //     localStorage.getItem('numberOfItems-SergioAJS') ||
  //     DEFAULT_NUMBER_OF_ITEMS
  // );
  // const [houseID, setHouseID] = useState(
  //   localStorage.getItem('houseID-SergioAJS') || ''
  // );
  // const { houses, isLoading, error, parsedLink } = useFetchGOT(
  //   searchValue,
  //   page,
  //   numberOfItems
  // );

  // const { data, isError, isFetching } = useGetHousesQuery(
  //   `${page && `page=${page}`}${numberOfItems && `&pageSize=${numberOfItems}`}${
  //     searchValue && `&region=${searchValue}`
  //   }`
  // );

  // const houses = data?.houses;

  // useEffect(() => {
  //   if (page) search.set('page', page);
  //   if (numberOfItems) search.set('numberOfItems', numberOfItems);
  //   setSearch(search);
  // }, [numberOfItems, page, search, setSearch]);

  // const onChangePage = (event: SyntheticEvent) => {
  //   const target = event.target as HTMLButtonElement;
  //   const slice = (link: string | undefined) => {
  //     if (link) {
  //       const result = link.split('&').slice(-2, -1)[0].split('=')[1];
  //       search.set('page', result);
  //       localStorage.setItem('page-SergioAJS', result);
  //       setPage(result);
  //       setSearch(search);
  //       navigate('/');
  //     }
  //   };
  //   switchPages(target.value, data?.parsedLink, slice);
  // };

  // const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const select = event.target.value;
  //   select
  //     ? search.set('numberOfItems', select)
  //     : search.delete('numberOfItems');
  //   search.set('page', FIRST_PAGE);
  //   setSearch(search);
  //   setNumberOfItems(select);
  //   setPage(FIRST_PAGE);
  //   localStorage.setItem('numberOfItems-SergioAJS', select);
  //   navigate('/');
  // };

  // const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   setInput(event.currentTarget.value);
  // };

  // const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setInput(input.trim());
  //   setSearchValue(input.trim());
  //   localStorage.setItem('searchValue-SergioAJS', input.trim());
  //   search.set('page', FIRST_PAGE);
  //   setSearch(search);
  //   setPage(FIRST_PAGE);
  // };

  // const [sidebar, setSidebar] = useState(false);
  // const onCardClick = (houseID: string) => {
  //   setSidebar(true);
  // const getHouseID = houseID.split('/')[5];
  // localStorage.setItem('houseID-SergioAJS', getHouseID);
  // setHouseID(getHouseID);
  // };

  // const sidebarClose = () => {
  //   setSidebar(false);
  // };

  return (
    // <Context.Provider
    // value={{ input, onChange, handleSearch, houses,
    //  onCardClick
    //  }}
    // >
    <div className={styles.main}>
      <Search />
      <TestErrorBoundary />
      <Pagination
      // page={page}
      // parsedLink={data?.parsedLink}
      // onChangePage={onChangePage}
      />
      <Select
        label="Number of Items:"
        name="select"
        id="selectNumberOfItems"
        // value={numberOfItems}
        // onSelect={onSelect}
        options={[
          { key: '4', value: '4', text: '4' },
          { key: '8', value: '8', text: '8' },
          {
            key: DEFAULT_NUMBER_OF_ITEMS,
            value: DEFAULT_NUMBER_OF_ITEMS,
            text: DEFAULT_NUMBER_OF_ITEMS,
          },
          { key: '12', value: '12', text: '12' },
          { key: '16', value: '16', text: '16' },
        ]}
      />
      <div className={styles.cardsContainer}>
        <HouseCards
        // isLoading={isFetching}
        // isError={isError}
        // onCardClick={onCardClick}
        />
        <Outlet context={{ houseId } satisfies ContextType} />
      </div>
    </div>
    // </Context.Provider>
  );
};
