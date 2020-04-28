import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useAuth } from '../../utils/use-auth';
import { FirebaseContext } from '../../utils/firebase';
import Firestore from '../../utils/firestore';

import EditIcon from '@material-ui/icons/Edit';

interface Props extends RouteComponentProps {
  path: string;
}

interface UserDetails {
  email: string;
  password: string;
  displayName: string;
}

export interface FlickList {
  title: string;
  movies: Array<Movie>;
}

export interface Movie {
  movieId: number;
  moviePoster: string;
  movieTitle: string;
}

const Login: React.FC<Props> = () => {
  const auth = useAuth();
  const context = useContext(FirebaseContext);
  const userId = auth.user && auth.user.uid;

  const [userLists, setUserLists] = useState<FlickList[]>([
    {
      title: '',
      movies: [
        {
          movieTitle: '',
          movieId: 0,
          moviePoster: ''
        }
      ]
    }
  ]);

  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: '',
    password: '',
    displayName: ''
  });

  useEffect(() => {
    const firestore = new Firestore();

    const fetchData = async () => {
      await firestore
        .getFlickLists(context, userId)
        .then((lists: Array<FlickList>) => {
          console.log(lists);
          const mappedMovieLists = lists.map((list: FlickList) => {
            return {
              title: list.title,
              movies: list.movies.map((movie: Movie) => {
                return {
                  movieTitle: movie.movieTitle,
                  movieId: movie.movieId,
                  moviePoster: movie.moviePoster
                };
              })
            };
          });

          setUserLists(userLists => [...userLists, ...mappedMovieLists]);
        });
    };

    fetchData();
  }, [context, userId]);

  const loginFirebase = () => {
    auth.signin(userDetails.email, userDetails.password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const updateUsername = () => {
    auth.updateUser(userDetails.displayName);
  };

  return !auth.user ? (
    <div className='flex h-full w-1/2 m-auto'>
      <form className='w-full p-8' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='email'
            name='email'
            onChange={handleInputChange}
            value={userDetails.email}
            placeholder='Email address'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            type='password'
            name='password'
            value={userDetails.password}
            placeholder='****'
            required
            onChange={handleInputChange}
          />
          <p className='text-red-500 text-xs italic'>
            Please choose a password.
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            onClick={loginFirebase}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center'>
        <h2 className='text-center mr-4'>
          Welcome back{' '}
          {auth.user.displayName ? auth.user.displayName : 'Movie Lover'}!
        </h2>
        <button
          className='flex-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='button'
          onClick={auth.signout}
        >
          Sign out
        </button>
      </div>
      <form className='mb-8' onSubmit={handleSubmit}>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Username
        </label>
        {auth.user.displayName ? (
          <div className='flex flex-row justify-center items-center'>
            <span className='mr-2'>{auth.user.displayName}</span>
            <EditIcon className='cursor-pointer' />
          </div>
        ) : (
          <div>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 mb-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              name='displayName'
              placeholder='Username'
              value={userDetails.displayName}
              onChange={handleInputChange}
            />
            <button
              onClick={updateUsername}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Update
            </button>
          </div>
        )}
      </form>

      <h3>My FlickLists</h3>

      {userLists.length &&
        userLists.map((list, index) => {
          const mappedMovies = list.movies.map(movie => (
            <li key={movie.movieId}>{movie.movieTitle}</li>
          ));

          return (
            <div key={index}>
              {list.title}
              <ol className='list-decimal'>{mappedMovies}</ol>
            </div>
          );
        })}
    </div>
  );
};

export default Login;
