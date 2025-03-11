import React from 'react';
import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-2xl font-bold text-white hover:text-accent transition-colors"
      aria-label="KodeLabz Home"
    >
      <Code2 className="w-8 h-8" />
      <span>KodeLabz</span>
    </Link>
  );
};

export default Logo;