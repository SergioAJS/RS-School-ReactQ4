import { ParsedData } from 'src/utils/parseLinkHeader';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  searchValue: string;
  inputValue: string;
  page: string;
  numberOfItems: string;
  houseId: string;
  parsedLink: ParsedData | undefined;
}

export const FIRST_PAGE = '1';
const DEFAULT_NUMBER_OF_ITEMS = '10';

export const initialState: InitialState = {
  searchValue: localStorage.getItem('searchValue-SergioAJS') || '',
  inputValue: localStorage.getItem('searchValue-SergioAJS') || '',
  page: localStorage.getItem('page-SergioAJS') || FIRST_PAGE,
  numberOfItems:
    localStorage.getItem('numberOfItems-SergioAJS') || DEFAULT_NUMBER_OF_ITEMS,
  houseId: localStorage.getItem('houseID-SergioAJS') || '',
  parsedLink: {},
};

export const housesQuerySlice = createSlice({
  name: 'searchHouse',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
    setNumberOfItems: (state, action: PayloadAction<string>) => {
      state.numberOfItems = action.payload;
    },
    setHouseId: (state, action: PayloadAction<string>) => {
      state.houseId = action.payload;
    },
    setParsedLink: (state, action: PayloadAction<ParsedData | undefined>) => {
      state.parsedLink = action.payload;
    },
  },
});

export const {
  setSearchValue,
  setInputValue,
  setPage,
  setNumberOfItems,
  setHouseId,
  setParsedLink,
} = housesQuerySlice.actions;

export default housesQuerySlice.reducer;
