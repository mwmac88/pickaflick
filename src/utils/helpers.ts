import { Movie } from '../types';

function getRandomNum(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomMovieFromList(movieList: Movie[]): Movie {
  const randomNum = getRandomNum(movieList.length - 1);
  return movieList[randomNum];
}
