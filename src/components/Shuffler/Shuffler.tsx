import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';

import Card from '../Card/Card';

import api from '../../utils/api';
import { getRandomMovieFromList } from '../../utils/helpers';
import { Genre, Movie } from '../../types';

const Shuffler: React.FC = () => {
  const [genres, setGenres] = useState([] as Genre[]);
  const [radioSelected, setRadioSelected] = useState({} as Genre);
  const [movieResult, setMovieResult] = useState({} as Movie);

  useEffect(() => {
    const apiCall = new api();
    const fetchGenres = async () => {
      const retrieveGenres = await apiCall.getAllGenres();
      setGenres(retrieveGenres.data.genres);
    };
    fetchGenres();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getRandomMovieResult = () => {
    const apiCall = new api();
    const genreResults = async () => {
      const moviesInGenre = await apiCall.getTop20RatedWithGenre(
        radioSelected.id
      );
      console.log(moviesInGenre.data.results);
      setMovieResult(getRandomMovieFromList(moviesInGenre.data.results));
    };
    genreResults();
  };

  const radioSelect = (selectedItem: Genre) => {
    setRadioSelected(selectedItem);
  };

  const renderRadios = <T extends Genre[]>(items: T) =>
    items.map((item: Genre) => {
      return (
        <div
          className={`flex items-center justify-center w-full min-h-16 border-solid border-2 hover:bg-orange-600 cursor-pointer ${
            item.id === radioSelected.id
              ? 'bg-orange-600 border-black'
              : 'border-orange-600 bg-orange-200'
          }`}
          key={item.id}
          onClick={() => radioSelect(item)}
        >
          <input
            type='radio'
            id={item.name}
            name='category'
            value={item.name}
            className='mr-3 hidden'
            checked={item.id === radioSelected.id}
            onChange={() => radioSelect(item)}
          />
          <label className='cursor-pointer' htmlFor={item.name}>
            {item.name}
          </label>
        </div>
      );
    });

  return (
    <div className='m-6'>
      <h2>Movie Roulette</h2>

      {movieResult && Object.keys(movieResult).length === 0 && (
        <>
          <form className='grid grid-cols-4 gap-3 my-8' onSubmit={handleSubmit}>
            {renderRadios(genres)}
          </form>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              Object.keys(radioSelected).length === 0
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => getRandomMovieResult()}
            disabled={Object.keys(radioSelected).length === 0}
          >
            Get Flick
          </button>
        </>
      )}

      {movieResult && movieResult.id && (
        <>
          <h3>Your Selected Random Movie Is:</h3>
          <div className='grid xs:grid-cols-1 sm:grid-cols-2 row-gap-6 col-gap-4 py-4'>
            <Link to={`/movie/${movieResult.id}`}>
              <Card movie={movieResult} />
            </Link>
          </div>
          <button
            className={
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            }
            onClick={() => setMovieResult({} as Movie)}
          >
            Pick again
          </button>
        </>
      )}
    </div>
  );
};

export default Shuffler;
