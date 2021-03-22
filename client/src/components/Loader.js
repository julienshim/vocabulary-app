import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        height: '83vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg width="50px" height="50px" viewBox="-100 -150 600 200">
        <circle cx="0" cy="50" r="50" fill="#ccc">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 0 ; 0 -200; 0 0"
            repeatCount="indefinite"
            begin="0"
          />
        </circle>
        <circle cx="200" cy="50" r="50" fill="#ccc">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 0 ; 0 -200; 0 0"
            repeatCount="indefinite"
            begin="0.25"
          />
        </circle>
        <circle cx="400" cy="50" r="50" fill="#ccc">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 0 ; 0 -200; 0 0"
            repeatCount="indefinite"
            begin="0.50"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
