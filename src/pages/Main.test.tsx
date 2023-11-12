import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from 'src/pages/Main';
import { Context, defaultContext } from 'src/utils/context';

describe('Tests for the Pagination component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Context.Provider value={{ ...defaultContext }}>
          <Main />
        </Context.Provider>
      </MemoryRouter>
    );

    const lastButton = screen.getByText('Last');
    expect(lastButton).toHaveTextContent('Last');
    fireEvent.click(lastButton);

    await screen.findByText('Page: 2');
  });
});
