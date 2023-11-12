import { ParsedData } from 'src/utils/parseLinkHeader';

export const switchPages = (
  value: string,
  parsedLink: ParsedData | null,
  slice: (link: string | undefined) => void
) => {
  switch (value) {
    case 'First':
      slice(parsedLink?.first);
      break;
    case 'Last':
      slice(parsedLink?.last);
      break;
    case 'Prev':
      slice(parsedLink?.prev);
      break;
    case 'Next':
      slice(parsedLink?.next);
      break;
  }
};
