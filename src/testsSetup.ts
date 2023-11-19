import server from 'src/mock/testServer';
import { housesApi, setupStore } from 'src/redux';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

const store = setupStore({});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  store.dispatch(housesApi.util.resetApiState());
  cleanup();
});
afterAll(() => server.close());
