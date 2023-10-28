import { Component, ErrorInfo } from 'react';

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorFallback extends Component<ErrorFallbackProps> {
  constructor(props: ErrorFallbackProps | Readonly<ErrorFallbackProps>) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {this.props.error && this.props.error.toString()}
          <br />
          {this.props.errorInfo && this.props.errorInfo.componentStack}
        </details>
      </div>
    );
  }
}
