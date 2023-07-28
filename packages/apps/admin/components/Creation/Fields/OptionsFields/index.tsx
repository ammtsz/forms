"use client";

import { useFormCreation } from "@/store/formCreation";
import React from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import FieldBase from "../FieldBase";
import FieldFooter from "../FieldFooter";
import FieldHeader from "../FieldHeader";
import { useOptions } from "../hooks/useOptions";
import Options from "./Options";

interface SelectProps {
  id: string;
}

const OptionsFieldsCreation: React.FC<SelectProps> = ({ id }) => {
  const {
    handleInputChange,
    handleCheckbox,
    handleDelete,
    handleAddOption,
    handleOptionChange,
    handleDeleteOption,
    handleDependsOnChange,
    toggleOtherOption,
    handleOtherOption,
    value,
  } = useOptions({ id });

  const { errors } = useFormCreation();

  return (
    <>
      <FieldHeader
        fieldId={id}
        handleDelete={handleDelete}
        handleDependsOn={handleDependsOnChange}
        type={getPrefixFromString(id)}
      />
      <FieldBase
        handleInputChange={handleInputChange}
        fieldErrors={errors && errors[id]}
        value={value}
      />
      <Options
        handleAddOption={handleAddOption}
        handleOptionChange={handleOptionChange}
        handleDeleteOption={handleDeleteOption}
        toggleOtherOption={toggleOtherOption}
        handleOtherOption={handleOtherOption}
        fieldErrors={errors && errors[id]}
        type={getPrefixFromString(id) as FieldsType}
        value={value}
      />
      <FieldFooter handleCheckbox={handleCheckbox} />
    </>
  );
};

export default OptionsFieldsCreation;
