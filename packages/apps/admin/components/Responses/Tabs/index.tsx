"use client";

import { Tabs as ChakraTabs, TabList, Tab } from "@chakra-ui/react";
import { useCallback } from "react";

import { StatusTypes } from "@app/constants/status";
import { useTableData } from "@app/store/tableData";

interface TabProps {
  name: string;
  id: string;
}

const TABS = [
  { name: "Todos", id: "all" },
  { name: "Principal", id: "main" },
  { name: "Novos", id: "new" },
] as TabProps[];

const Tabs: React.FC = () => {
  const { filterTableData } = useTableData();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const id = event.currentTarget.getAttribute("data-id") as StatusTypes;

      return filterTableData({ tab: id });
    },
    [filterTableData]
  );

  return (
    <ChakraTabs size="sm" variant="enclosed">
      <TabList>
        {TABS.map((tab) => (
          <Tab
            key={tab.name}
            bg="gray.200"
            data-id={tab.id}
            onClick={handleClick}
            _hover={{ bg: "gray.300" }}
            _selected={{
              color: "white",
              bg: "blackAlpha.800",
              _hover: { bg: "black" },
            }}
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>
    </ChakraTabs>
  );
};

export default Tabs;
