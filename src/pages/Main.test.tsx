// import { fireEvent, render, screen } from '@testing-library/react';
// import { rest } from 'msw';
// import { useState } from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { App } from 'src/App';
// import { testHouses } from 'src/mock/handlers';
// import server from 'src/mock/testServer';
// import { vi } from 'vitest';

// describe('', () => {
//   let mockSearchParam = '';

//   vi.doMock('react-router-dom', async () => {
//     const actual = vi.importActual<typeof import('react-router-dom')>;
//     return {
//       ...actual,
//       MemoryRouter,
//       useSearchParams: () => {
//         const [params, setParams] = useState(
//           new URLSearchParams(mockSearchParam)
//         );
//         return [
//           params,
//           (newParams: string) => {
//             mockSearchParam = newParams;
//             setParams(new URLSearchParams(newParams));
//           },
//         ];
//       },
//     };
//   });
//   it('', async () => {
//     render(
//       <MemoryRouter>
//         <App />
//       </MemoryRouter>
//     );

//     const nextButton = screen.getByText('Next');
//     expect(nextButton).toBeVisible();
//     fireEvent.click(nextButton);

//     server.use(
//       rest.get(
//         'https://www.anapioficeandfire.com/api/houses/?page=2',
//         (_req, res, ctx) => {
//           return res(ctx.status(200), ctx.json(testHouses), ctx.delay(50));
//         }
//       )
//     );

//     await screen.findByText('Next');

//     expect(mockSearchParam).toContain('page=2');
//   });
// });
