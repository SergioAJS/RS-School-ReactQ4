import { Outlet } from 'react-router-dom';
import { HouseCards } from 'src/components/houseCards/HouseCards';
import { Pagination } from 'src/components/pagination/Pagination';
import { Search } from 'src/components/search/Search';
import { Select } from 'src/components/select/Select';
import { TestErrorBoundary } from 'src/components/testErrorBoundary/TestErrorBoundary';
import { useAppSelector } from 'src/hooks/hooks';
import styles from 'src/pages/main/Main.module.scss';

export type ContextType = {
  houseId: string;
};

const DEFAULT_NUMBER_OF_ITEMS = '10';

export const Main = () => {
  const houseId = useAppSelector((state) => state.housesQuery.houseId);

  return (
    <div className={styles.main}>
      <Search />
      <TestErrorBoundary />
      <Pagination />
      <Select
        label="Number of Items:"
        name="select"
        id="selectNumberOfItems"
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
        <HouseCards />
        <Outlet context={{ houseId } satisfies ContextType} />
      </div>
    </div>
  );
};
