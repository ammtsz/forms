"use client";

import { Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface GoToFormButtonProps {
  title: string;
  id: string;
}

const GoToFormButton: React.FC<GoToFormButtonProps> = ({
  title,
  id,
}: GoToFormButtonProps) => {
  const router = useRouter();

  const handleRedirect = useCallback(() => {
    router.push(`/form?id=${id}`);
  }, [id]);

  return (
    <Button onClick={handleRedirect} minH={40} minW={80} boxShadow={"md"}>
      {title || <i>Sem título</i>}
    </Button>
  );
};

export default GoToFormButton;
