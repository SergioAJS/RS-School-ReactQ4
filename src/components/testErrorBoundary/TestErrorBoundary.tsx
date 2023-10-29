import { Component } from 'react';

interface TestErrorBoundaryState {
  hasError: boolean;
}

export class TestErrorBoundary extends Component<
  object,
  TestErrorBoundaryState
> {
  constructor(props: object) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleClick = () => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Catch');
    }
    return <button onClick={this.handleClick}>TestErrorBoundary</button>;
  }
}
