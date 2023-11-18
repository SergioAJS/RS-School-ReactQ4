import { fireEvent, render, screen } from '@testing-library/react';
import { App } from 'src/App';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from 'src/redux';

describe('App', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(() => null),
      },
      writable: true,
    });
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore()}>
          <App />
        </Provider>
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
    render(
      <MemoryRouter>
        <Provider store={setupStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });
});
