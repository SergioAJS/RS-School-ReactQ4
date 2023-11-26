import { useState } from 'react';
import styles from 'src/components/testErrorBoundary/TestErrorBoundary.module.scss';

export const TestErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Catch');
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      TestErrorBoundary
    </button>
  );
};
