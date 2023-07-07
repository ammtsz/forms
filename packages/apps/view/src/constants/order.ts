import { SortOrder as BaseTableSortOrder } from "react-base-table";

export const SortOrder = {
  asc: "asc" as BaseTableSortOrder,
  desc: "desc" as BaseTableSortOrder,
};

export type SortOrderTypes = ConstantValues<typeof SortOrder>;
