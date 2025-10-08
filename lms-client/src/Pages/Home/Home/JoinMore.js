import React from 'react';

const JoinMore = () => {
  return (
    <div className="bg-primary py-20 px-40">
      <div className="flex justify-between">
        <h1 className='text-3xl text-white font-bold'>
          Join more than<span className="text-secondary">8 million</span> <br />{' '}
          <span className='text-secondary'>learners</span> worldwide
        </h1>
        <button className="btn btn-secondary hover:btn-outline px-10">
          Start Learning For Free
        </button>
      </div>
    </div>
  );
};

export default JoinMore;