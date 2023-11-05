import { Main } from 'src/pages/Main';
import 'src/App.scss';
import { Route, Routes } from 'react-router-dom';
// import { Loader } from 'src/components/loader/Loader';
import { DetailedCard } from 'src/components/detailedCard/DetailedCard';

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
