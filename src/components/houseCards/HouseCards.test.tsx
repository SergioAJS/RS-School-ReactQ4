import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { HouseCards } from 'src/components/houseCards/HouseCards';
import server from 'src/mock/testServer';
import { renderWithProviders } from 'src/utils/testUtils';
import { screen } from '@testing-library/react';

describe('HouseCards component', () => {
  it('Renders list of 10 cards', async () => {
    renderWithProviders(
      <BrowserRouter>
        <HouseCards />
      </BrowserRouter>
    );

    await screen.findAllByTestId('houseCard');
    expect(screen.getAllByTestId('houseCard').length).toBe(10);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    renderWithProviders(
      <BrowserRouter>
        <HouseCards />
      </BrowserRouter>
    );

    server.use(
      rest.get(
        'https://www.anapioficeandfire.com/api/houses/',
        (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json([]), ctx.delay(50));
        }
      )
    );
    expect(screen.findByText('House does not exist'));
  });
});
