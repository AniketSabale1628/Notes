// CircleButton.js
import React from 'react';

const CircleButton = ({ color, onClick}) => {
  const buttonStyle = {
    backgroundColor: color,
    width: window.innerWidth >= 768 ? '30px' : '20px',
    height: window.innerWidth >= 768 ? '30px' : '20px',
    borderRadius: '50%',
    margin: window.innerWidth >= 768 ? '5px' : '0.5px',
    cursor: 'pointer',
    color:'white',
    border: 'none',
  };
  return <button style={buttonStyle} onClick={onClick} className='circleColor'></button>;
};

export default CircleButton;
