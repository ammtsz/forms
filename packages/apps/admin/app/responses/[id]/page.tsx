"use client";

import { UserSession } from "@/app/api/auth/[...nextauth]/route";
import IsSignedIn from "@/components/IsSignedIn";
import ActionsButton from "@/components/Responses/ActionsButton";
import ColumnsFilter from "@/components/Responses/ColumnsFilter";
import CopyButton from "@/components/Responses/CopyButton";
import SearchBar from "@/components/Responses/SearchBar";
import Table from "@/components/Responses/Table";
import Tabs from "@/components/Responses/Tabs";
import { useTableData } from "@/store/tableData";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
    </IsSignedIn>
  );
};

export default FormViewPage;
