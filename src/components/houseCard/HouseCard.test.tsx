import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'src/App';
import { HouseCards } from 'src/components/houseCards/HouseCards';
import { testHouse } from 'src/mock/handlers';
import server from 'src/mock/testServer';
import { useGetHousesQuery } from 'src/redux';
import { renderWithProviders } from 'src/utils/testUtils';
import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

describe('House card component', () => {
  it('The card component renders the relevant card data', async () => {
    renderWithProviders(
      <BrowserRouter>
        <HouseCards />
      </BrowserRouter>
    );

    await screen.findAllByTestId('houseCard');

    expect(screen.getAllByTestId('houseCard')[0]).toHaveTextContent(
      'Region: The Westerlands'
    );

    expect(screen.getAllByTestId('houseCard')[0]).toHaveTextContent(
      'House Algood'
    );
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const card = await screen.findByText(/House Algood/i);

    fireEvent.click(card);

    server.use(
      rest.get(
        'https://www.anapioficeandfire.com/api/houses/1',
        (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(testHouse), ctx.delay(50));
        }
      )
    );

    await screen.findByTestId('detailedCard');
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    describe('House card component', () => {
      it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
        renderWithProviders(
          <BrowserRouter>
            <HouseCards />
          </BrowserRouter>
        );

        const card = await screen.findByText(/House Algood/i);

        fireEvent.click(card);

        const method = 'fetch';

        const spy = vi.spyOn(useGetHousesQuery, method);

        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
