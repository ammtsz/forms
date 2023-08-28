"use client";

import { useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { X as XIcon } from "react-feather";
import { useTranslation } from "react-i18next";

import ConfirmationModal from "@app/components/ConfirmationModal";

interface FormCardProps {
  title: string;
  id: string;
  handleDelete: (id: string) => void;
}

const FormCard: React.FC<FormCardProps> = ({
  title,
  id,
  handleDelete,
}: FormCardProps) => {
  const [isSelected, setSelected] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    setSelected((prev) => !prev);
  }, []);

  return !isSelected ? (
    <button onClick={handleClick} className="btn_card light_scheme">
      <p className="whitespace-break-spaces overflow-hidden">{title}</p>
    </button>
  ) : (
    <>
      <div className="btn_card_back light_scheme">
        <div className="flex m-2 mt-0 gap-4">
          <i className="whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </i>
          <button onClick={handleClick} className="ml-auto hover:text-gray-600">
            <XIcon size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-4 font-bold">
          <div className="flex justify-between w-full gap-4">
            <Link href={`/responses/${id}`} className="sub_btn_card">
              <p className="whitespace-break-spaces overflow-hidden">
                {t("commons.responses")}
              </p>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_FORMS_URL}/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sub_btn_card"
            >
              <p className="whitespace-break-spaces overflow-hidden">
                {t("home.buttons.openForm")}
              </p>
            </Link>
          </div>
          <div className="flex justify-between w-full gap-4">
            <Link href={`/edit/${id}`} className="sub_btn_card">
              <p className="whitespace-break-spaces overflow-hidden">
                {t("commons.edit")}
              </p>
            </Link>
            <button className="sub_btn_card" onClick={onOpen}>
              <p className="whitespace-break-spaces overflow-hidden">
                {t("commons.delete")}
              </p>
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => handleDelete(id)}
        texts={{
          title: t("home.buttons.deleteForm"),
          message: `${t("confirmations.deleteForm")} ${t(
            "confirmations.cantBeUndone"
          )}`,
          mainButton: t("commons.delete"),
          isDanger: true,
        }}
      />
    </>
  );
};

export default FormCard;
