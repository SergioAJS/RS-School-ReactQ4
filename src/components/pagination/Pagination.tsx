import { SyntheticEvent } from 'react';
import { Button } from 'src/components/button/Button';
import styles from 'src/components/pagination/Pagination.module.scss';
import { ParsedData } from 'src/utils/parseLinkHeader';
import { switchPages } from 'src/utils/switchPages';

interface PaginationProps {
  parsedLink: ParsedData | undefined;
}

export const Pagination = (props: PaginationProps) => {
  const parsedLink = props.parsedLink;
  console.log(parsedLink);
  const page = '1';

  const onChangePage = (event: SyntheticEvent) => {
    const target = event.target as HTMLButtonElement;
    const slice = (link: string | undefined) => {
      if (link) {
        const result = link.split('&').slice(-2, -1)[0].split('=')[1];
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
