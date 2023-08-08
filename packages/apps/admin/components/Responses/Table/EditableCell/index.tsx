"use client";

import { TableCell } from "@/components/Responses/Table/styles";
import Tooltip from "@/components/Tooltip";
import { useTableData } from "@/store/tableData";
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
          <Button
            {...getSubmitButtonProps()}
            aria-label="salvar"
            p={0}
            size="sm"
          >
            <CheckIcon height="0.75rem" />
          </Button>
        ) : (
          <Button {...getEditButtonProps()} aria-label="editar" p={0} size="sm">
            <EditIcon height="0.75rem" />
          </Button>
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
        defaultValue={notes || "Adcionar nota"}
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
