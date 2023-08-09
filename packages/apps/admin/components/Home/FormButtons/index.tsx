"use client";

import { UserSession } from "@/app/api/auth/[...nextauth]/route";
import GoToFormButton from "@/components/Home/GoToFormButton";
import { useFormsManagement } from "@/store/formsManagement";
import { Button, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const FormButtons: React.FC = () => {
  const [formsNames, setFormsNames] = useState<{ title: string; id: string }[]>(
    []
  );

  const { getForms, getFormsNamesAndIds } = useFormsManagement();

  const route = useRouter();

  const { data: session } = useSession();

  const loadForms = useCallback(
    async (forms: string[]) => {
      await getForms(forms);
      getFormsNamesAndIds();
      setFormsNames(getFormsNamesAndIds());
    },
    [getForms, getFormsNamesAndIds]
  );

  useEffect(() => {
    const forms = (session as UserSession)?.user?.forms;

    if (forms) {
      loadForms(forms);
    }
  }, [loadForms, session]);

  return (
    <Flex gap={4} direction={"column"} maxWidth={"1200px"} margin={"auto"}>
      <Flex justifyContent={"center"} gap={4} flexWrap={"wrap"}>
        <Button
          onClick={() => route.push("/create")}
          minH={40}
          minW={80}
          bg={"blackAlpha.800"}
          color={"white"}
          _hover={{ bg: "whiteAlpha.800", color: "inherit" }}
          boxShadow={"md"}
        >
          + Criar novo formulário
        </Button>
        {formsNames.map((form) => (
          <GoToFormButton key={form.id} {...form} />
        ))}
      </Flex>
    </Flex>
  );
};

export default FormButtons;
