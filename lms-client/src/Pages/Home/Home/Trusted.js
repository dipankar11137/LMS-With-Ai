import React from 'react';
import img1 from '../../../Images/Trusted/1.svg';
import img2 from '../../../Images/Trusted/2.svg';
import img3 from '../../../Images/Trusted/3.svg';
import img4 from '../../../Images/Trusted/4.svg';
import img5 from '../../../Images/Trusted/5.svg';
import img6 from '../../../Images/Trusted/6.svg';


const Trusted = () => {
  return (
    <div data-aos="fade-up" data-aos-duration="3000" className="my-20 mx-auto">
      <h1 className="text-center my-10 text-slate-600">
        Trusted by the world’s best
      </h1>
      <div className="flex justify-center items-center gap-24  my-10 ">
        <div>
          <img src={img1} alt="" />{' '}
        </div>
        <div>
          <img src={img2} alt="" />{' '}
        </div>
        <div>
          <img src={img3} alt="" />{' '}
        </div>
        <div>
          <img src={img4} alt="" />{' '}
        </div>
        <div>
          <img src={img5} alt="" />{' '}
        </div>
        <div>
          <img src={img6} alt="" />{' '}
        </div>
      </div>
    </div>
  );
};

export default Trusted;