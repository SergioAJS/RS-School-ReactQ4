import server from 'src/mock/testServer';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.close();
  server.resetHandlers();
  cleanup();
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => server.close());
