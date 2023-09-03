"use client";

import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import IsSignedIn from "@app/components/IsSignedIn";
import ActionsButton from "@app/components/Responses/ActionsButton";
import ColumnsFilter from "@app/components/Responses/ColumnsFilter";
import CopyButton from "@app/components/Responses/CopyButton";
import SearchBar from "@app/components/Responses/SearchBar";
import Table from "@app/components/Responses/Table";
import Tabs from "@app/components/Responses/Tabs";
import { useTableData } from "@app/store/tableData";
import { UserSession } from "@app/types";

import { Container } from "./styles";

const FormViewPage: React.FC = () => {
  const [isValidForm, setValidForm] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const { loadFormResponses, getForm } = useTableData();

  const { data: session } = useSession();

  const id = usePathname().split("/")[2];

  const loadData = useCallback(async () => {
    const userForms = (session as UserSession)?.user?.forms || [];

    if (id && userForms.includes(id)) {
      setLoading(true);

      const form = await getForm(id);
      setValidForm(!!form);

      if (form) {
        await loadFormResponses(id);
      }

      setLoading(false);
    } else {
      setValidForm(false);
    }
  }, [session, id, getForm, loadFormResponses]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <IsSignedIn>
      <Container as="main">
        <Flex gap={4} direction={["column", "column", "row"]} mb={8}>
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
    </IsSignedIn>
  );
};

export default FormViewPage;
