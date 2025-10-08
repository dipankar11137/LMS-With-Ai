import wave from '../../../Images/Bg/wave3.svg';
import './Wave.css';

const Wave = () => {
  return (
    <div className="relative h-28 overflow-hidden">
      {/* Moving Wave */}
      <div className="absolute inset-0 flex w-[250%] h-full animate-wave">
        {/* Two identical wave sections for seamless motion */}
        <div
          className="w-1/2 h-full bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${wave})` }}
        ></div>
        <div
          className="w-1/2 h-full bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${wave})` }}
        ></div>
      </div>
    </div>
  );
};

export default Wave;