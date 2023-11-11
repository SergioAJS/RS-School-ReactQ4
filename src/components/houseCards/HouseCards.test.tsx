import { render } from '@testing-library/react';
import { HouseCards } from 'src/components/houseCards/HouseCards';
import { mock10Houses } from 'src/mock/mock10Houses';
import { screen } from '@testing-library/react';
import { Context, defaultContext } from 'src/components/utils/context';
import { BrowserRouter } from 'react-router-dom';
import { mock4Houses } from 'src/mock/mock4Houses';
import { HouseGOT } from 'src/models/HouseGOT';

interface TestProps {
  houses: HouseGOT[];
}

describe('HouseCards component', () => {
  const houses10 = mock10Houses;
  const houses4 = mock4Houses;
  const noHouses: HouseGOT[] = [];

  const TestApp = (props: TestProps) => {
    return (
      <BrowserRouter>
        <Context.Provider value={{ ...defaultContext, houses: props.houses }}>
          <HouseCards isLoading={false} error={null} />
        </Context.Provider>
      </BrowserRouter>
    );
  };

  it('Renders list of 10 cards', () => {
    render(<TestApp houses={houses10} />);
    expect(screen.getAllByTestId('houseCard').length).toBe(10);
  });

  it('Renders list of 4 cards', () => {
    render(<TestApp houses={houses4} />);
    expect(screen.getAllByTestId('houseCard').length).toBe(4);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(<TestApp houses={noHouses} />);
    expect(screen.findByText('House does not exist'));
  });
});
