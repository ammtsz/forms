"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { X as XIcon } from "react-feather";

interface GoToFormButtonProps {
  title: string;
  id: string;
}

const GoToFormButton: React.FC<GoToFormButtonProps> = ({
  title,
  id,
}: GoToFormButtonProps) => {
  const [isSelected, setSelected] = useState(false);

  const handleClick = useCallback(() => {
    setSelected((prev) => !prev);
  }, []);

  return !isSelected ? (
    <button
      onClick={handleClick}
      className="h-40 w-80 bg-gray-100 rounded-2xl shadow-md flex items-center justify-center p-8 leading-5 font-bold text-center"
    >
      <p className="whitespace-break-spaces overflow-hidden">{title}</p>
    </button>
  ) : (
    <div className="h-40 w-80 bg-gray-100 rounded-2xl shadow-md flex p-4 flex-col">
      <div className="flex m-2 mt-0 gap-4">
        <i className="whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </i>
        <button onClick={handleClick} className="ml-auto hover:text-gray-600">
          <XIcon size={16} />
        </button>
      </div>
      <div className="flex gap-4 font-bold ">
        <Link
          href={`https://forms-submission.vercel.app/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-24 w-full bg-white hover:bg-gray-50 justify-center items-center rounded-2xl shadow-md flex p-4 font-bold text-center"
        >
          <p className="whitespace-break-spaces overflow-hidden">Ver form</p>
        </Link>
        <Link
          href={`/responses/${id}`}
          className="h-24 w-full bg-white hover:bg-gray-50 justify-center items-center rounded-2xl shadow-md flex p-4 font-bold text-center"
        >
          <p className="whitespace-break-spaces overflow-hidden">
            Ver respostas
          </p>
        </Link>
      </div>
    </div>
  );
};

export default GoToFormButton;
