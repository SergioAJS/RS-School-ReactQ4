import { Component } from 'react';
import styles from 'src/components/search/Search.module.scss';

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
    return (
      <button className={styles.button} onClick={this.handleClick}>
        TestErrorBoundary
      </button>
    );
  }
}
