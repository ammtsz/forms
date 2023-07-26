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

import Tooltip from "@/components/Tooltip/Tooltip";
import { useTableData } from "@/store/tableData";

import { TableCell } from "../../../../components/View/Table/styles";

interface EditableCellProps {
  rowData: { id: string; notes: string | null };
}

const EditableCell: React.FC<EditableCellProps> = ({ rowData }) => {
  const [text, setText] = useState("");

  const { updateResponseNote } = useTableData();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((event): void => {
      setText(event.target.value);
    }, []);

  const handleBlur: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(() => {
      updateResponseNote(text, rowData.id);
    }, [rowData, text, updateResponseNote]);

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
    if (rowData.notes) setText(rowData.notes);
  }, [rowData.notes]);

  return (
    <TableCell>
      <Editable
        defaultValue={rowData.notes || "Adcionar nota"}
        display="flex"
        flexDir="row"
        fontSize="sm"
        isPreviewFocusable={false}
        justifyContent={"space-between"}
        w="100%"
      >
        <Tooltip hasArrow label={text}>
          <EditablePreview color={text ? "black" : "blackAlpha.500"} />
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
