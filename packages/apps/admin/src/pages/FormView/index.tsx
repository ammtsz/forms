import { Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ActionsButton from "@app/components/ActionsButton";
import ColumnsFilter from "@app/components/ColumnsFilter";
import CopyButton from "@app/components/CopyButton";
import SearchBar from "@app/components/SearchBar";
import Table from "@app/components/Table";
import Tabs from "@app/components/Tabs";
import { useTableData } from "@app/store/tableData";

import { Container } from "./styles";
const FormViewPage = () => {
  const [isLoading, setLoading] = useState(false);

  const { loadFormResponses, loadForm } = useTableData();

  const { search } = useLocation();
  const id =
    new URLSearchParams(search).get("id") ||
    "7e7a952f-c85a-442a-92a9-7ee7cd15776f";

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
