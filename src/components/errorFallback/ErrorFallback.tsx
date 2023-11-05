import { ErrorInfo } from 'react';

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export const ErrorFallback = (props: ErrorFallbackProps) => {
  return (
    <div>
      <h2>Something went wrong. Please refresh the page.</h2>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        {props.error && props.error.toString()}
        <br />
        {props.errorInfo && props.errorInfo.componentStack}
      </details>
    </div>
  );
};
