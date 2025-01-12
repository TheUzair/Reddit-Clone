import { FaBell, FaEnvelope, FaChevronDown } from "react-icons/fa";
import Image from "next/image";

export default function UserActions() {
  return (
    <div className="col-span-2 p-4 flex items-center justify-end space-x-4">
      <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <FaBell className="w-6 h-6 text-gray-700 dark:text-white" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF4500] rounded-full"></span>
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <FaEnvelope className="w-6 h-6 text-gray-700 dark:text-white" />
      </button>
      <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <div className="relative w-8 h-8">
          <Image
            src="/default-avatar.jpg"
            alt="User avatar"
            fill
            className="rounded-full object-cover"
            sizes="32px"
            priority
          />
        </div>
        <FaChevronDown className="w-4 h-4 text-gray-700 dark:text-white" />
      </div>
    </div>
  );
}