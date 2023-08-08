"use client";

import { useTableData } from "@/store/tableData";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useCallback } from "react";
import { Search as SearchIcon } from "react-feather";

import { debounce } from "@forms/utils";

const SearchBar: React.FC = () => {
  const { filterTableData } = useTableData();

  const filterResponses = debounce(
    useCallback(
      (searchTerm: string) => {
        filterTableData({ searchTerm });
      },
      [filterTableData]
    ),
    500
  );

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      filterResponses(event.target.value);
    },
    [filterResponses]
  );

  return (
    <InputGroup size="md" w={"100%"}>
      <InputLeftAddon>
        <SearchIcon />
      </InputLeftAddon>
      <Input
        placeholder="Buscar"
        onChange={handleSearch}
        fontSize={["sm", "sm", "md"]}
      />
    </InputGroup>
  );
};

export default SearchBar;
