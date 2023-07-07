import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ActionsButton from "@app/components/ActionsButton";
import ColumnsFilter from "@app/components/ColumnsFilter";
import SearchBar from "@app/components/SearchBar";
import Table from "@app/components/Table";
import Tabs from "@app/components/Tabs";
import { useTableData } from "@app/store/tableData";

import { Container } from "./styles";
const FormViewPage = () => {
  const { loadFormResponses, loadForm } = useTableData();

  const { search } = useLocation();
  const id =
    new URLSearchParams(search).get("id") ||
    "7e7a952f-c85a-442a-92a9-7ee7cd15776f";

  useEffect(() => {
    loadForm(id);
    loadFormResponses(id);
  }, [id, loadForm, loadFormResponses]);

  return (
    <Container>
      <Flex pb={4} gap={2}>
        <SearchBar />
        <ActionsButton />
        <ColumnsFilter />
      </Flex>
      <Tabs />
      <Table />
    </Container>
  );
};

export default FormViewPage;
