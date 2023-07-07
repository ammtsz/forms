import { FieldProps } from "@forms/types/interfaces/field";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";
import { formatDateAndHour } from "@forms/utils";

import { Tabs, TabsTypes } from "@app/constants/tabs";
import { TableData } from "@app/types";

export const processResponsesData = (
  responses: FormValuesProps[],
  fields: FieldProps[]
) => {
  const searchData: string[][] = [];
  const tableData = responses.map((response, index) => {
    const id = String(index);
    const responseData = { id };
    const responseSearchData: string[] = [id];

    fields.forEach((field) => {
      const value =
        field.type === "date" && response[field.id]
          ? formatDateAndHour(response[field.id]?.value)
          : response[field.id]?.value || "";

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
  tab: TabsTypes
) => {
  const filteredIds = getFilteredDataIds(searchTerm, searchData);

  return tableData.filter((data) => {
    return (
      (tab === Tabs.all || data.status === tab) &&
      filteredIds.some((id) => id === data.id)
    );
  });
};

export const filterByTab = (tab: TabsTypes, tableData: TableData[]) => {
  return tableData.filter((data) =>
    tab !== Tabs.all ? data.status === tab : true
  );
};
