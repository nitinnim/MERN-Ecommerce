import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-20 text-white text-center py-4 min-h-[200px] flex flex-col items-center justify-center">
      <p>&copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="/" className="hover:text-gray-400">Privacy Policy</a>
        <span>|</span>
        <a href="/" className="hover:text-gray-400">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
