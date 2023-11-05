import { Main } from 'src/pages/Main';
import 'src/App.scss';
import { Route, Routes } from 'react-router-dom';
import { Loader } from 'src/components/loader/Loader';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="character" element={<Loader />} />
        </Route>
      </Routes>
    </>
  );
};
