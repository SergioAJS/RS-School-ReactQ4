import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'src/App';
import { HouseCards } from 'src/components/houseCards/HouseCards';
import { Context, defaultContext } from 'src/utils/context';
import { testHouse } from 'src/mock/handlers';
import { mock4Houses } from 'src/mock/mock4Houses';
import server from 'src/mock/testServer';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useFetchGOTHouse } from 'src/service/useFetchGOTHouse';

describe('House card component', () => {
  it('The card component renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <Context.Provider value={{ ...defaultContext, houses: mock4Houses }}>
          <HouseCards isLoading={false} error={null} />
        </Context.Provider>
      </BrowserRouter>
    );

    expect(screen.getAllByTestId('houseCard')[0]).toHaveTextContent(
      'Region: The Westerlands'
    );

    expect(screen.getAllByTestId('houseCard')[0]).toHaveTextContent(
      'House Algood'
    );
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
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
        render(
          <BrowserRouter>
            <App />
          </BrowserRouter>
        );

        const card = await screen.findByText(/House Algood/i);

        fireEvent.click(card);

        const method = 'fetch';

        const spy = vi.spyOn(useFetchGOTHouse, method);

        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
