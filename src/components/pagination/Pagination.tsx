import { SyntheticEvent } from 'react';
import { Button } from 'src/components/button/Button';
import styles from 'src/components/pagination/Pagination.module.scss';
import { ParsedData } from 'src/utils/parseLinkHeader';

interface PaginationProps {
  page: string | undefined;
  parsedLink: ParsedData | null | undefined;
  onChangePage: (event: SyntheticEvent) => void;
}

export const Pagination = (props: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <Button
        className={styles.button}
        type="submit"
        value={'First'}
        onClick={props.onChangePage}
        text="First"
      />
      <Button
        disabled={!props.parsedLink?.prev}
        className={styles.button}
        type="submit"
        onClick={props.onChangePage}
        value={'Prev'}
        text="Prev"
      />
      <p>Page: {props.page}</p>
      <Button
        disabled={!props.parsedLink?.next}
        className={styles.button}
        type="submit"
        onClick={props.onChangePage}
        value={'Next'}
        text="Next"
      />
      <Button
        className={styles.button}
        type="submit"
        value={'Last'}
        onClick={props.onChangePage}
        text="Last"
      />
    </div>
  );
};
