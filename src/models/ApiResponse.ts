import { Character } from 'src/models/Character';
import { HouseGOT } from 'src/models/HouseGOT';

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  results: Character[];
}

export interface ApiResponseGOT {
  housesGOT: HouseGOT[];
}
