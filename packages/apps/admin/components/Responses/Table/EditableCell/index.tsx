"use client";

import {
  Editable,
  EditableTextarea,
  EditablePreview,
  Flex,
  Button,
  Textarea,
  useEditableControls,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { Check as CheckIcon, Edit as EditIcon } from "react-feather";
import { useTranslation } from "react-i18next";

import { TableCell } from "@app/components/Responses/Table/styles";
import Tooltip from "@app/components/Tooltip";
import { useTableData } from "@app/store/tableData";

interface EditableCellProps {
  responseId: string;
  notes: string | null;
}

const EditableCell: React.FC<EditableCellProps> = ({
  responseId: id,
  notes,
}) => {
  const [text, setText] = useState("");

  const { updateResponseNote } = useTableData();

  const { t } = useTranslation();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((event): void => {
      setText(event.target.value);
    }, []);

  const handleBlur: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(() => {
      updateResponseNote(text, id);
    }, [id, text, updateResponseNote]);

  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getEditButtonProps } =
      useEditableControls();

    return (
      <Flex>
        {isEditing ? (
          <Tooltip label={t("commons.save")}>
            <Button
              {...getSubmitButtonProps()}
              aria-label={t("commons.save")}
              p={0}
              size="sm"
            >
              <CheckIcon height="0.75rem" />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip label={t("commons.edit")}>
            <Button
              {...getEditButtonProps()}
              aria-label={t("commons.edit")}
              p={0}
              size="sm"
            >
              <EditIcon height="0.75rem" />
            </Button>
          </Tooltip>
        )}
      </Flex>
    );
  };

  useEffect(() => {
    if (notes) setText(notes);
  }, [notes]);

  return (
    <TableCell>
      <Editable
        defaultValue={notes || t("responses.placeholders.addNote")}
        display="flex"
        flexDir="row"
        fontSize="sm"
        isPreviewFocusable={false}
        justifyContent={"space-between"}
        w="100%"
      >
        <Tooltip label={text}>
          <EditablePreview
            color={text ? "black" : "blackAlpha.500"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
          />
        </Tooltip>
        <Textarea
          as={EditableTextarea}
          color={"black"}
          fontSize="sm"
          minH="2rem"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <EditableControls />
      </Editable>
    </TableCell>
  );
};

export default EditableCell;
