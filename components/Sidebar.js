"use client"

import { FaChevronDown, FaUser, FaStar, FaReddit } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="space-y-6 block sticky top-0">
      {/* Filter Section */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Filter by</span>
          <FaChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </div>
      </div>

      {/* Favorites Section */}
      <div>
        <div className="flex items-center justify-between mb-3 px-3">
          <span className="text-sm font-bold text-gray-800 dark:text-gray-100">FAVORITES</span>
          <span className="text-sm text-gray-600 dark:text-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">All</span>
        </div>
      </div>

      {/* Users Section */}
      <div className="space-y-2">
        {[
          { name: 'r/funnymore', followers: '156' },
          { name: 'r/breakingnews', followers: '12' },
          { name: 'r/lovestory', followers: '' },
          { name: 'r/gamingfun', followers: '08' }
        ].map((user) => (
          <div key={user.name} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <FaUser className="w-4 h-4 text-gray-500 dark:text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
            </div>
            {user.followers && (
              <span className="text-xs text-gray-700 dark:text-gray-200 p-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                {user.followers}
              </span>
            )}
          </div>
        ))}
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Reddit Feeds Section */}
      <div>
        <div className="flex items-center justify-between mb-3 px-3">
          <span className="text-sm font-bold text-gray-800 dark:text-gray-100">REDDIT FEEDS</span>
          <span className="text-sm text-gray-600 dark:text-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">All</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'r/moveiw', followers: '04' },
            { name: 'r/gaming', followers: '' },
            { name: 'r/pics', followers: '32' },
            { name: 'r/gifs', followers: '' }
          ].map((user) => (
            <div key={user.name} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <FaUser className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
              </div>
              {user.followers && (
                <span className="text-xs text-gray-700 dark:text-gray-200 p-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                  {user.followers}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Communities Section */}
      <div>
        <div className="flex items-center justify-between mb-3 px-3">
          <span className="text-sm font-bold text-gray-800 dark:text-gray-100">COMMUNITIES</span>
          <span className="text-sm text-gray-600 dark:text-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">All</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'r/funnymore', followers: '' },
            { name: 'r/breakingnews', followers: '' },
            { name: 'r/lovestory', followers: '43' },
            { name: 'r/gamingfun', followers: '12' }
          ].map((user) => (
            <div key={user.name} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <FaUser className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
              </div>
              {user.followers && (
                <span className="text-xs text-gray-700 dark:text-gray-200 p-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                  {user.followers}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;