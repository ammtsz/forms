import { MakeRequired } from "@forms/types/global/makeRequired";
import { FieldProps, OptionsFieldProps } from "@forms/types/interfaces/field";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";
import { isOptionTypeField } from "@forms/utils";

import { TabTypes, TableData } from "./types";

type OptionsField = MakeRequired<OptionsFieldProps, "options">;

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
      let value = "";

      if (isOptionTypeField(field.type)) {
        const responseValue = response[field.id].value;
        const selectedOption = (field as OptionsField).options.find(
          ({ value }) => value === responseValue
        );

        value = selectedOption ? selectedOption.label : "";
      } else {
        value = response[field.id]?.value || "";
      }
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
