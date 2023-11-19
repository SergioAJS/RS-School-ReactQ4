import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { testHouses } from 'src/mock/handlers';
import server from 'src/mock/testServer';
import { Main } from 'src/pages/main/Main';
import { renderWithProviders } from 'src/utils/testUtils';
import { fireEvent, screen } from '@testing-library/react';

describe('Tests for the Pagination component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    server.use(
      rest.get(
        'https://www.anapioficeandfire.com/api/houses/?page=2',
        (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(testHouses), ctx.delay(50));
        }
      )
    );

    const prevButton = await screen.findByText('Prev');
    expect(prevButton).toHaveTextContent('Prev');
    fireEvent.click(prevButton);

    await screen.findByText('Page: 1');
  });
});
