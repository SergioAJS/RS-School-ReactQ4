import { MemoryRouter } from 'react-router-dom';
import { App } from 'src/App';
import { render, screen } from '@testing-library/react';

describe('Tests for the 404 Page component', () => {
  it('The 404 page is displayed when navigating to an invalid route', () => {
    const wrongRoute = '/wrong/route';

    render(
      <MemoryRouter initialEntries={[wrongRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Page404/i)).toBeInTheDocument();
  });
});
