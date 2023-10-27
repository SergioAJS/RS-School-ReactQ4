import { Component } from 'react';

export class Search extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <label htmlFor="search">
          <input type="search" name="search" />
        </label>
        Search
      </div>
    );
  }
}
