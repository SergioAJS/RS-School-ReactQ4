import { Search } from 'src/components/search/Search';
import { render, screen } from '@testing-library/react';

describe('App', () => {
  it('Search button has "Search" value'),
    () => {
      render(<Search />);
      expect(screen.getByRole('button')).toHaveValue('Search');
    };

  // const searchInput: HTMLInputElement = screen.getByPlaceholderText(
  //   'You can search by the region'
  // );
});
