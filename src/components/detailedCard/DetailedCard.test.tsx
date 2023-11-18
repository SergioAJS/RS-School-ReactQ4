import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'src/App';
import { testHouse } from 'src/mock/handlers';
import server from 'src/mock/testServer';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from 'src/redux';

describe('Detailed card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
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

    expect(screen.getByTestId('loader')).toHaveTextContent('Loading');
  });

  it('The detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
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

    await screen.findByText(
      'Coat Of Arms: A golden wreath, on a blue field with a gold border(Azure, a garland of laurel within a bordure or)'
    );
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
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

    const detailedCard = await screen.findByTestId('detailedCard');

    const close = screen.getByAltText('close');

    fireEvent.click(close);

    expect(detailedCard).not.toBeVisible();
  });
});

describe('', () => {
  beforeAll(() => {
    server.close();
    server.listen({ onUnhandledRequest: 'error' });
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const card = await screen.findByText(/House Algood/i);

    fireEvent.click(card);

    server.use(
      rest.get(
        'https://www.anapioficeandfire.com/api/houses/1',
        (_req, res, ctx) => {
          return res(ctx.status(401), ctx.json([]));
        }
      )
    );

    // await screen.findByText('House does not exist');
  });
});
