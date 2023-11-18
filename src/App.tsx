import { Route, Routes } from 'react-router-dom';
import { DetailedCard } from 'src/components/detailedCard/DetailedCard';
import { Main } from 'src/pages/Main';
import { Page404 } from 'src/pages/Page404';
import 'src/App.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="house/:id" element={<DetailedCard />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
