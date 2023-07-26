"use client";

import ActionsButton from "@/components/View/ActionsButton";
import ColumnsFilter from "@/components/View/ColumnsFilter";
import CopyButton from "@/components/View/CopyButton";
import SearchBar from "@/components/View/SearchBar";
import Table from "@/components/View/Table";
import Tabs from "@/components/View/Tabs";
import { useTableData } from "@/store/tableData";
import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Container } from "./styles";

const FormViewPage: React.FC = () => {
  const [isLoading, setLoading] = useState(false);

  const { loadFormResponses, loadForm } = useTableData();

  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "7e7a952f-c85a-442a-92a9-7ee7cd15776f";

  const loadData = useCallback(async () => {
    setLoading(true);
    await loadForm(id);
    await loadFormResponses(id);
    setLoading(false);
  }, [id, loadForm, loadFormResponses]);

  useEffect(() => {
    loadData();
  }, [id, loadData, loadForm, loadFormResponses]);

  return (
    <Container>
      <Flex pb={5} gap={2}>
        <SearchBar />
        <CopyButton />
        <ColumnsFilter />
        <ActionsButton />
      </Flex>
      <Tabs />
      <Table isLoading={isLoading} />
    </Container>
  );
};

export default FormViewPage;
