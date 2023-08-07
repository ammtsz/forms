"use client";

import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

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
  }, [id, router]);

  return (
    <Button onClick={handleRedirect} height={40} width={80} boxShadow="md">
      <Text whiteSpace="break-spaces" overflow="hidden">
        {title || <i>Sem título</i>}
      </Text>
    </Button>
  );
};

export default GoToFormButton;
