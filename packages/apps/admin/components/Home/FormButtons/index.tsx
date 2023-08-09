"use client";

import GoToFormButton from "@components/Home/GoToFormButton";
import { useFormsManagement } from "@store/formsManagement";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { UserSession } from "@app/api/auth/[...nextauth]/route";

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
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link
          href="/create"
          className="h-40 w-80 bg-black text-white rounded-2xl shadow-md flex items-center justify-center hover:opacity-80 font-bold"
        >
          + Criar novo formulário
        </Link>
        {formsNames.map((form) => (
          <GoToFormButton key={form.id} {...form} />
        ))}
      </div>
    </div>
  );
};

export default FormButtons;
