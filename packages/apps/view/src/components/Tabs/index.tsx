import { Tabs as ChakraTabs, TabList, Tab } from "@chakra-ui/react";
import { useCallback } from "react";

import { TabsTypes } from "@app/constants/tabs";
import { useTableData } from "@app/store/tableData";

interface TabProps {
  name: string;
  id: string;
}

interface TabsProps {
  tabs: TabProps[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }: TabsProps) => {
  const { filterByTab } = useTableData();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const id = event.currentTarget.getAttribute("data-id") as TabsTypes;

      return filterByTab(id);
    },
    [filterByTab]
  );

  return (
    <ChakraTabs size="sm" variant="enclosed">
      <TabList>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            bg="gray.200"
            data-id={tab.id}
            onClick={handleClick}
            _hover={{ bg: "blackAlpha.200" }}
            _selected={{
              color: "white",
              bg: "cyan.800",
              _hover: { bg: "cyan.900" },
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
