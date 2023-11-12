import { BrowserRouter } from 'react-router-dom';
import { HouseCards } from 'src/components/houseCards/HouseCards';
import { Context, defaultContext } from 'src/utils/context';
import { mock10Houses } from 'src/mock/mock10Houses';
import { mock4Houses } from 'src/mock/mock4Houses';
import { HouseGOT } from 'src/models/HouseGOT';
import { render, screen } from '@testing-library/react';

interface TestProps {
  houses: HouseGOT[];
}

const TestApp = (props: TestProps) => {
  return (
    <BrowserRouter>
      <Context.Provider value={{ ...defaultContext, houses: props.houses }}>
        <HouseCards isLoading={false} error={null} onCardClick={() => {}} />
      </Context.Provider>
    </BrowserRouter>
  );
};

describe('HouseCards component', () => {
  const houses10 = mock10Houses;
  const houses4 = mock4Houses;
  const noHouses: HouseGOT[] = [];

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
