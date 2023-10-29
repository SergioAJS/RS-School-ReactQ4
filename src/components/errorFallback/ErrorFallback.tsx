import { Component, ErrorInfo } from 'react';

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorFallback extends Component<ErrorFallbackProps> {
  render() {
    return (
      <div>
        <h2>Something went wrong. Please refresh the page.</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {this.props.error && this.props.error.toString()}
          <br />
          {this.props.errorInfo && this.props.errorInfo.componentStack}
        </details>
      </div>
    );
  }
}
