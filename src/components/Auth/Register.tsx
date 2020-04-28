import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useAuth } from '../../utils/use-auth';

interface Props extends RouteComponentProps {
  path: string;
}

const Register: React.FC<Props> = () => {
  const auth = useAuth();

  const [userDetails, setUserDetails] = useState({
    username: '',
    password: ''
  });

  const registerFirebase = () => {
    auth.signup(userDetails.username, userDetails.password);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e);
    const { name, value } = e.currentTarget;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='username'
        >
          Username
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='text'
          value={userDetails.username}
          placeholder='Username'
          required
          onChange={handleInputChange}
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
          value={userDetails.password}
          placeholder='****'
          required
          onChange={handleInputChange}
        />
        <p className='text-red-500 text-xs italic'>Please choose a password.</p>
      </div>
      <div className='flex items-center justify-between'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='button'
          onClick={registerFirebase}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
