import { FaReddit } from "react-icons/fa";

export default function Logo() {
  return (
    <div className="flex items-center">
      <FaReddit className="w-8 h-8 text-[#FF4500]" />
      <span className="ml-1 font-bold dark:text-white">reddit</span>
    </div>
  );
}