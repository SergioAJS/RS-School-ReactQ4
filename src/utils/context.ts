import { createContext } from 'react';
import { HouseGOT } from 'src/models/HouseGOT';

export interface ContextInterface {
  input?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  handleSearch?: (event: React.FormEvent<HTMLFormElement>) => void;
  // houses?: HouseGOT[];
  houses?: HouseGOT[];
  onCardClick?: (houseID: string) => void;
}

export const defaultContext: ContextInterface = {
  input: '',
  onChange: () => {},
  handleSearch: () => {},
  houses: [],
  onCardClick: () => {},
};

export const Context = createContext<ContextInterface>(defaultContext);
