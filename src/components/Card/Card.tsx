import React from 'react';
import { Movie } from '../../types';

interface Props {
  movie: Movie;
}

const Card: React.FC<Props> = ({ movie }) => {
  const { title, vote_average: score, poster_path: imageUrl } = movie;

  return (
    <div className='relative flex flex-col items-center h-full shadow-lg bg-orange-100 border-solid border-2 border-gray-200 px-2 py-3'>
      <span className='flex justify-center items-center absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500 text-xl font-bold text-white p-6'>
        {score}
      </span>
      <img
        className='w-full mb-2'
        src={`https://${process.env.REACT_APP_TMDB_POSTER_URL}/${imageUrl}`}
        alt='Movie Thumbnail'
      ></img>

      <div className='flex justify-center text-center min-h-12 h-auto py-2'>
        <p className='text-gray-700 text-lg font-medium leading-tight'>
          {title}
        </p>
      </div>
    </div>
  );
};

export default Card;
