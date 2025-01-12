import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaReddit } from 'react-icons/fa';

const AdSection = () => {
  return (
    <div className="space-y-4 block sticky top-0">
      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute top-4 left-4 grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-600"
            />
          ))}
        </div>

        <div className="absolute -top-6 -right-6">
          <div className="relative flex items-center justify-center h-24 w-24">
            <div className="absolute h-24 w-24 rounded-full border-[6px] border-t-transparent border-r-transparent border-gray-100 dark:border-gray-600"></div>
          </div>
        </div>

        <div className="pt-20 flex flex-col items-center">
          <div className="flex flex-col items-center space-y-2 mb-6">
            <div className="flex items-center space-x-2">
              <FaReddit className="w-8 h-8 text-reddit" />
              <div className="text-2xl font-bold relative">
                redd
                <span className="relative">
                  i
                  <span className="absolute -top-8 -left-0 text-reddit-red text-5xl">.</span>
                </span>
                t
              </div>
            </div>
            <h6 className="text-gray-800 font-semibold dark:text-gray-300 text-sm">
              Advertise on Reddit
            </h6>
          </div>

          <button className="px-8 py-2 border-2 border-reddit-red text-reddit-red font-medium rounded-full hover:bg-red-50 transition-colors">
            Get Started
          </button>
        </div>
      </div>
      <div className='hidden lg:block w-full'> 
        <Link
          href="https://ads.reddit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity max-w-[260px] w-full"
        >
          <div className="relative w-full aspect-[13/10] bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src="/light-sale.jpg"
              alt="Reddit Sale"
              fill
              className="object-cover dark:hidden sm:w-full"
              sizes="100vw"
              priority
            />
            <Image
              src="/dark-sale.jpg"
              alt="Reddit Sale"
              fill
              className="hidden object-cover dark:block dark:brightness-200"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gray-700 opacity-[0.9] dark:block hidden"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdSection;