import { Component, ReactNode } from 'react';
import { Main } from 'src/pages/Main';
import 'src/App.css';

export class App extends Component {
  render(): ReactNode {
    return (
      <div>
        <Main />
      </div>
    );
  }
}
