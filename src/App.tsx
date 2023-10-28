import { Component, ReactNode } from 'react';
import './App.css';
import { Main } from './pages/Main';

export class App extends Component {
  render(): ReactNode {
    return (
      <div>
        <Main />
      </div>
    );
  }
}
