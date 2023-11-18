import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/button/Button';
import styles from 'src/components/pagination/Pagination.module.scss';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { setPage } from 'src/redux/housesQuerySlice';
// import { ParsedData } from 'src/utils/parseLinkHeader';
import { switchPages } from 'src/utils/switchPages';

// interface PaginationProps {
//   page: string | undefined;
//   parsedLink: ParsedData;
//   onChangePage: (event: SyntheticEvent) => void;
// }

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const parsedLink = useAppSelector((state) => state.housesQuery.parsedLink);
  const page = useAppSelector((state) => state.housesQuery.page);
  const navigate = useNavigate();

  const onChangePage = (event: SyntheticEvent) => {
    const target = event.target as HTMLButtonElement;
    const slice = (link: string | undefined) => {
      if (link) {
        const result = link.split('&').slice(-2, -1)[0].split('=')[1];
        // search.set('page', result);
        localStorage.setItem('page-SergioAJS', result);
        dispatch(setPage(result));
        // setPage(result);
        // setSearch(search);
        navigate('/');
      }
    };
    switchPages(target.value, parsedLink, slice);
  };

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.button}
        type="submit"
        value={'First'}
        onClick={onChangePage}
        text="First"
      />
      <Button
        disabled={!parsedLink?.prev}
        className={styles.button}
        type="submit"
        onClick={onChangePage}
        value={'Prev'}
        text="Prev"
      />
      <p>Page: {page}</p>
      <Button
        disabled={!parsedLink?.next}
        className={styles.button}
        type="submit"
        onClick={onChangePage}
        value={'Next'}
        text="Next"
      />
      <Button
        className={styles.button}
        type="submit"
        value={'Last'}
        onClick={onChangePage}
        text="Last"
      />
    </div>
  );
};
