import { useOutletContext } from 'react-router-dom';
import { ContextType } from 'src/pages/main/Main';

export const useID = () => {
  return useOutletContext<ContextType>();
};
