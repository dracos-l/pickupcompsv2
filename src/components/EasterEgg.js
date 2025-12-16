import React from 'react';

const EasterEgg = () => {
  return (
    <div className="easter">
      <img
        src={require(`./images/easter_egg.jpg`)}
        alt="easter_egg"
        className="easter_egg"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default EasterEgg;
