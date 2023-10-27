import { Component } from 'react';
import { Search } from '../components/search/Search';
import { Cards } from '../components/cards/Cards';

export class Main extends Component {
  render() {
    return (
      <div>
        <Search />
        <Cards />
      </div>
    );
  }
}
