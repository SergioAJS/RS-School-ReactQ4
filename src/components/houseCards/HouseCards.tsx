import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HouseCard } from 'src/components/houseCard/HouseCard';
import styles from 'src/components/houseCards/HouseCards.module.scss';
import { Loader } from 'src/components/loader/Loader';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { HouseGOT } from 'src/models/HouseGOT';
import { useGetHousesQuery } from 'src/redux';
import { setParsedLink } from 'src/redux/housesQuerySlice';

export const HouseCards = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useSearchParams();

  const searchValue = useAppSelector((state) => state.housesQuery.searchValue);
  const page = useAppSelector((state) => state.housesQuery.page);
  const numberOfItems = useAppSelector(
    (state) => state.housesQuery.numberOfItems
  );
  const { data, isError, isFetching } = useGetHousesQuery(
    `${page && `page=${page}`}${numberOfItems && `&pageSize=${numberOfItems}`}${
      searchValue && `&region=${searchValue}`
    }`
  );

  useEffect(() => {
    if (page) search.set('page', page);
    if (numberOfItems) search.set('numberOfItems', numberOfItems);
    setSearch(search);

    if (data) {
      dispatch(setParsedLink(data.parsedLink));
    }
  }, [data, dispatch, numberOfItems, page, search, setSearch]);

  const renderCards = (houses: HouseGOT[] | undefined) => {
    if (houses)
      return houses.map((house) => <HouseCard house={house} key={house.url} />);
  };

  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : isError ? (
        <p>{'error'}</p>
      ) : (
        <>
          <ul className={styles.cards}>{renderCards(data?.houses)}</ul>
        </>
      )}
    </div>
  );
};
