"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useFormCreation } from "@app/store/formCreation";
import { UserSession } from "@app/types";

const useInitialData = () => {
  const [isLoadingForm, setLoadingForm] = useState(false);
  const [isValidForm, setValidForm] = useState(true);

  const { data: session } = useSession();

  const { loadForm } = useFormCreation();

  const id = usePathname().split("/")[2];

  const loadData = useCallback(async () => {
    const userForms = (session as UserSession)?.user?.forms || [];

    if (id && userForms.includes(id)) {
      setLoadingForm(true);

      const { hasError } = await loadForm(id);
      setValidForm(!hasError);

      setLoadingForm(false);
    } else {
      setValidForm(false);
    }
  }, [session, id, loadForm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    isLoadingForm,
    isValidForm,
  };
};

export default useInitialData;
