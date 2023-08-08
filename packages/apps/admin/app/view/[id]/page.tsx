"use client";

import ActionsButton from "@/components/View/ActionsButton";
import ColumnsFilter from "@/components/View/ColumnsFilter";
import CopyButton from "@/components/View/CopyButton";
import SearchBar from "@/components/View/SearchBar";
import Table from "@/components/View/Table";
import Tabs from "@/components/View/Tabs";
import { useTableData } from "@/store/tableData";
import { Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Container } from "./styles";

const FormViewPage: React.FC = () => {
  const [isValidForm, setValidForm] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const { loadFormResponses, getForm } = useTableData();

  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const loadData = useCallback(async () => {
    setLoading(true);

    const form = await getForm(id);
    setValidForm(!!form);

    if (form) {
      await loadFormResponses(id);
    }

    setLoading(false);
  }, [id, getForm, loadFormResponses]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id, loadData, getForm, loadFormResponses]);

  return (
    <Container>
      <Flex pb={5} gap={4} direction={["column", "column", "row"]} mb={8}>
        <SearchBar />
        <Flex justifyContent={"space-between"} gap={"0.5rem"} ml={"auto"}>
          <CopyButton />
          <ColumnsFilter />
          <ActionsButton />
        </Flex>
      </Flex>
      <Tabs />
      <Table isLoading={isLoading} hasError={!isValidForm} />
    </Container>
  );
};

export default FormViewPage;
