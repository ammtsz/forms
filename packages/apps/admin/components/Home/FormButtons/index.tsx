"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import FormCard from "@app/components/Home/FormCard";
import useToast from "@app/hooks/useToast";
import { useFormsManagement } from "@app/store/formsManagement";
import { UserSession } from "@app/types";

const FormButtons: React.FC = () => {
  const [formsNames, setFormsNames] = useState<{ title: string; id: string }[]>(
    []
  );

  const { getForms, getFormsNamesAndIds, deleteForm } = useFormsManagement();

  const { data: session } = useSession();

  const { openToast } = useToast();

  const handleDelete = useCallback(
    async (id: string) => {
      // const id = event.currentTarget.dataset.id as string;
      const { hasError } = await deleteForm(id, session?.user?.email as string);

      if (!hasError) {
        setFormsNames((prev) => prev.filter((form) => form.id !== id));
        openToast({
          description: "Formulário apagado com sucesso",
          status: "success",
        });
      } else {
        openToast({
          description: "Não foi possível apagar o formulário",
          status: "error",
        });
      }
    },
    [deleteForm, openToast, session?.user?.email]
  );

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
        <FormCard key={form.id} {...form} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default FormButtons;
