import { MemoryRouter } from 'react-router-dom';
import { App } from 'src/App';
import { renderWithProviders } from 'src/utils/testUtils';
import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

describe('App', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(() => null),
      },
      writable: true,
    });
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByTestId('input');
    const search = screen.getByTestId('search');

    fireEvent.change(input, { target: { value: 'Stark' } });
    fireEvent.click(search);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'searchValue-SergioAJS',
      'Stark'
    );
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });
});
