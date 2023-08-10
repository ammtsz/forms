"use client";

import GoToFormButton from "@components/Home/GoToFormButton";
import { useFormsManagement } from "@store/formsManagement";
import { UserSession } from "@types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const FormButtons: React.FC = () => {
  const [formsNames, setFormsNames] = useState<{ title: string; id: string }[]>(
    []
  );

  const { getForms, getFormsNamesAndIds } = useFormsManagement();

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
    <div className="flex gap-4 flex-wrap justify-center">
      <Link href="/create" className="btn_card black_scheme">
        + Criar novo formulário
      </Link>
      {formsNames.map((form) => (
        <GoToFormButton key={form.id} {...form} />
      ))}
    </div>
  );
};

export default FormButtons;
