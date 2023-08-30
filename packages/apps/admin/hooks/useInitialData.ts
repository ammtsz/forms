"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useFormCreation } from "@app/store/formCreation";
import { useTableData } from "@app/store/tableData";
import { UserSession } from "@app/types";

const useInitialData = () => {
  const [isLoadingForm, setLoadingForm] = useState(false);
  const [isValidForm, setValidForm] = useState(true);
  const [hasResponses, setResponses] = useState(false);

  const { loadFormResponses, responses } = useTableData();

  const { data: session } = useSession();

  const { loadForm } = useFormCreation();

  const id = usePathname().split("/")[2];

  const loadData = useCallback(async () => {
    const userForms = (session as UserSession)?.user?.forms || [];

    if (id && userForms.includes(id)) {
      setLoadingForm(true);

      const { hasError } = await loadForm(id);

      if (!hasError) {
        await loadFormResponses(id);
      }

      setValidForm(!hasError);

      setLoadingForm(false);
    } else {
      setValidForm(false);
    }
  }, [session, id, loadForm, loadFormResponses]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setResponses(responses.length > 0);
  }, [responses]);

  return {
    isLoadingForm,
    isValidForm,
    hasResponses,
  };
};

export default useInitialData;
