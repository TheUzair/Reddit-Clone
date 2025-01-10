import React from 'react';
import { FaCircle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-700 p-6 block sticky top-0">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 mb-4">
          {['About', 'Advertise', 'Reddit App'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <FaCircle className="w-1.5 h-1.5 text-gray-400" />
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {item}
              </a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 mb-4">
          {['Careers', 'Help', 'Reddit Gold'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <FaCircle className="w-1.5 h-1.5 text-gray-400" />
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {item}
              </a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 mb-4">
          {['Press', 'Blog', 'Reddit Hits'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <FaCircle className="w-1.5 h-1.5 text-gray-400" />
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {item}
              </a>
            </div>
          ))}
        </div>

        <hr className="border-gray-200 dark:border-gray-600 my-4" />

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ©{new Date().getFullYear()}
          </div>
          <div className="flex gap-4">
            {['Privacy', 'Terms'].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {item}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;