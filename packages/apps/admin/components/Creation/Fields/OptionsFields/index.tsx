"use client";

import React from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";
import { FieldComponentProps } from "@app/types";

import FieldBase from "../FieldBase";
import FieldFooter from "../FieldFooter";
import FieldHeader from "../FieldHeader";
import { useOptions } from "../hooks/useOptions";
import Options from "./Options";

const OptionsFieldsCreation: React.FC<FieldComponentProps> = ({
  id,
  isDisabled,
  setDraggable,
}) => {
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
        initialDependsOn={value.dependsOn}
        isDisabled={isDisabled}
        setDraggable={setDraggable}
      />
      <FieldBase
        handleInputChange={handleInputChange}
        fieldErrors={errors && errors[id]}
        value={value}
        isDisabled={isDisabled}
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
        isDisabled={isDisabled}
      />
      <FieldFooter
        handleCheckbox={handleCheckbox}
        isRequired={value.isRequired}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default OptionsFieldsCreation;
