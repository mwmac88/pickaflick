import React from 'react';

interface Props {}

const Search: React.FC<Props> = () => {
  return (
    <div>
      <input
        className='border-b border-black appearance-none focus:outline-none leading-relaxed bg-transparent text-3xl px-4 py-2'
        type='search'
        placeholder='Search movie title'
      />
    </div>
  );
};

export default Search;
