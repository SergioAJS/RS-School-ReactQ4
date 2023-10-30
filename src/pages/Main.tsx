import { useState } from 'react';
import { CharacterCards } from 'src/components/characterCards/CharacterCards';
import { Search } from 'src/components/search/Search';
import { TestErrorBoundary } from 'src/components/testErrorBoundary/TestErrorBoundary';
import styles from 'src/pages/Main.module.scss';

export const Main = () => {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('searchValue-SergioAJS') || ''
  );
  const [input, setInput] = useState<string>(
    localStorage.getItem('searchValue-SergioAJS') || ''
  );

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput(input.trim());
    setSearchValue(input.trim());
    localStorage.setItem('searchValue-SergioAJS', input.trim());
  };

  return (
    <div className={styles.main}>
      <Search handleSearch={handleSearch} onChange={onChange} input={input} />
      <TestErrorBoundary />
      <CharacterCards searchValue={searchValue} />
    </div>
  );
};
