import { useOutletContext } from 'react-router-dom';
import { ContextType } from 'src/pages/Main';

export const useID = () => {
  return useOutletContext<ContextType>();
};
