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
    <button onClick={handleClick} className="btn_card light_scheme">
      <p className="whitespace-break-spaces overflow-hidden">{title}</p>
    </button>
  ) : (
    <div className="btn_card_back light_scheme">
      <div className="flex m-2 mt-0 gap-4">
        <i className="whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </i>
        <button onClick={handleClick} className="ml-auto hover:text-gray-600">
          <XIcon size={16} />
        </button>
      </div>
      <div className="flex gap-4 font-bold ">
        <Link href={`/edit/${id}`} className="sub_btn_card">
          <p className="whitespace-break-spaces overflow-hidden">Editar form</p>
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_FORMS_URL}/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="sub_btn_card"
        >
          <p className="whitespace-break-spaces overflow-hidden">Ver form</p>
        </Link>
        <Link href={`/responses/${id}`} className="sub_btn_card">
          <p className="whitespace-break-spaces overflow-hidden">
            Ver respostas
          </p>
        </Link>
      </div>
    </div>
  );
};

export default GoToFormButton;
