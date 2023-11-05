import { Route, Routes } from 'react-router-dom';
import { DetailedCard } from 'src/components/detailedCard/DetailedCard';
import { Main } from 'src/pages/Main';
import 'src/App.scss';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="house/:id" element={<DetailedCard />} />
        </Route>
      </Routes>
    </>
  );
};
