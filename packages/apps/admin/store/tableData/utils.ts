import { FieldProps } from "@forms/types/interfaces/field";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";
import { formatDateAndHour, isToggleTypeField } from "@forms/utils";

import { TabTypes, TableData } from "./types";

const getValue = (field: FieldProps, response: FormValuesProps) => {
  if (field.id === "created-at" && response[field.id]) {
    return formatDateAndHour(response[field.id]?.value);
  }

  if (isToggleTypeField(field.type)) {
    const value = response[field.id]?.value;

    return value === "true" ? "Sim" : value === "false" ? "Não" : "";
  }

  return response[field.id]?.value || "";
};

export const processResponsesData = (
  responses: FormValuesProps[],
  fields: FieldProps[]
) => {
  const searchData: string[][] = [];
  const tableData = responses.map((response) => {
    const id = response.id.value;
    const responseData = { id };
    const responseSearchData: string[] = [id];

    fields.forEach((field) => {
      const value = getValue(field, response);

      responseData[field.id] = value;
      responseSearchData.push(value);
    });

    searchData.push(responseSearchData);

    return { ...responseData, status: response.status?.value || "new" };
  }) as TableData[];

  return { tableData, searchData };
};

const getFilteredDataIds = (searchTerm: string, searchData: string[][]) => {
  const filteredIds: string[] = [];

  for (const response of searchData) {
    const search = response.filter(
      (value, index) => index > 0 && value.includes(searchTerm)
    );

    if (search.length > 0) filteredIds.push(response[0]);
  }

  return filteredIds;
};

export const filterBySearchTerm = (
  searchTerm: string,
  searchData: string[][],
  tableData: TableData[],
  tab: TabTypes
) => {
  const filteredIds = getFilteredDataIds(searchTerm, searchData);

  return tableData.filter((data) => {
    return (
      (tab === "all" || data.status === tab) &&
      filteredIds.some((id) => id === data.id)
    );
  });
};

export const filterByTab = (tab: TabTypes, tableData: TableData[]) => {
  return tableData.filter((data) =>
    tab !== "all" ? data.status === tab : true
  );
};
