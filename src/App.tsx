import React, { useEffect, useState } from 'react';
import { Router, Link, RouteComponentProps } from '@reach/router';
import 'firebase/firestore';
import { ProvideAuth } from './utils/use-auth.js';

import Modal from './components/Modal/Modal';
import Shuffler from './components/Shuffler/Shuffler';
import Login from './components/Auth/Login';
import Card from './components/Card/Card';

import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShuffleIcon from '@material-ui/icons/Shuffle';

import api from './utils/api';

import { Movie, MovieDetails } from './types';

const mockMovieDetails = {
  backdrop_path: '',
  genres: [{}],
  overview: '',
  releaseDate: '',
  runtime: 0,
  title: '',
};

interface CardsViewProops {
  path: string;
}
interface MovieViewProops extends RouteComponentProps {
  path: string;
  movieId?: number;
}

const MovieView: React.FC<MovieViewProops> = ({ movieId }) => {
  const [movieInfo, setMovieInfo] = useState<MovieDetails>(mockMovieDetails);

  useEffect(() => {
    const apiCall = new api();
    const fetchData = async () => {
      const movieInfoResults = await apiCall.getMovieInfo(movieId);
      setMovieInfo(movieInfoResults.data);
    };
    fetchData();
  }, [movieId]);

  return (
    <div>
      <div
        className='relative flex flex-col justify-center items-center bg-fixed bg-cover bg-center h-screen md:h-header-cover'
        style={{
          backgroundImage: movieInfo.backdrop_path
            ? `url(https://${process.env.REACT_APP_TMDB_BACKDROP_URL}${movieInfo.backdrop_path})`
            : '',
        }}
      >
        <span className='absolute top-0 left-0 bg-gray-700 opacity-90 w-full min-h-full'></span>
        <h1 className='text-white text-center z-10 py-6 px-2'>
          {movieInfo.title}
        </h1>
      </div>
      <div className='bg-gray-800 py-6 px-2'>
        <h3 className='font-body font-medium text-xl text-center text-white md:w-9/12 xl:w-8/12 mx-auto'>
          {movieInfo.overview}
        </h3>
      </div>
    </div>
  );
};

const CardsView: React.FC<CardsViewProops> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const apiCall = new api();

    const fetchData = async () => {
      let top20 = await apiCall.getTop20();
      setMovies(top20.data.results);
    };
    fetchData();
  }, []);

  const loadMoreMovies = () => {
    setPage(page + 1);
  };

  const renderCards = () => {
    //map movie data here and render cards
    return movies.map((movie) => (
      <Link to={`/movie/${movie.id}`} key={movie.id} className='h-full'>
        <Card movie={movie} />
      </Link>
    ));
  };

  return (
    <div className='container mx-auto xs:px-4 sm:px-3 md:px-2'>
      <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 row-gap-6 col-gap-4 py-4'>
        {renderCards()}
        <div className='flex justify-center items-center'>
          <span
            onClick={loadMoreMovies}
            className='w-32 h-32 rounded-full bg-orange-500 text-3xl text-center font-bold text-white p-6 leading-snug hover:bg-orange-600 cursor-pointer transform transition-transform hover:scale-125 duration-300 ease-in-out'
          >
            Load more!
          </span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ProvideAuth>
      <header className='flex flex-row items-center bg-orange-400 px-4'>
        <span className='flex-auto text-gray-800 py-2 z-10 hover:text-white'>
          <MenuIcon fontSize='large' className='cursor-pointer' />
        </span>
        <Link to='/' className='flex-auto py-2'>
          <h1 className='text-white text-center sm:py-4 xs:text-4xl sm:text-4xl md:text-5xl'>
            Pick-A-Flick
          </h1>
        </Link>
        <div className='flex flex-auto justify-end'>
          <Link to='/login' className='mr-4'>
            <PersonIcon fontSize='large' className='cursor-pointer' />
          </Link>
          <Link to='/register'>
            <PersonAddIcon fontSize='large' className='cursor-pointer' />
          </Link>
        </div>
      </header>
      <main>
        <Router>
          <CardsView path='/' />
          <MovieView path='movie/:movieId' />
          <Login path='/login' />
        </Router>
        <div className='fixed bottom-8 right-8 flex justify-center items-center'>
          <span
            onClick={() => setModalVisible(!modalVisible)}
            className='w-24 h-24 rounded-full bg-orange-500 text-5xl text-center font-bold text-white p-6 leading-snug hover:bg-orange-600 cursor-pointer transform transition-transform hover:scale-125 duration-300 ease-in-out'
          >
            <ShuffleIcon fontSize='inherit' className='cursor-pointer' />
          </span>
        </div>
        {modalVisible && (
          <Modal setModalVisible={setModalVisible}>
            <Shuffler />
          </Modal>
        )}
      </main>
    </ProvideAuth>
  );
};

export default App;
