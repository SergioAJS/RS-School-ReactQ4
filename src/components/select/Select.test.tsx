import { BrowserRouter } from 'react-router-dom';
import { App } from 'src/App';
import { renderWithProviders } from 'src/utils/testUtils';
import { fireEvent, screen } from '@testing-library/react';

describe('Select componemt', () => {
  it('Change number of items', async () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByRole('combobox')).toHaveValue('10');

    const select = await screen.findByLabelText('Number of Items:');

    fireEvent.change(select, { target: { value: '12' } });
    expect(screen.getByRole('combobox')).toHaveValue('12');
  });
});
