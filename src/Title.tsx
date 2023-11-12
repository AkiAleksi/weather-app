// Title.tsx
import React from 'react';
import './Title.css';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <h1 className="app-title">{text}</h1>;
};

export default Title;