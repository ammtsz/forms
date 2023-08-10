import { Status, StatusTypes } from "@constants/status";

import { ConfirmationTexts } from "../../ConfirmationModal";

export const ACTIONS = [
  {
    label: "Apagar",
    action: Status.deleted,
  },
  {
    label: "Mover para 'Principal'",
    action: Status.main,
  },
];

export const getConfirmationTexts = (
  count: number
): { [key: StatusTypes]: ConfirmationTexts } => ({
  [Status.main]: {
    action: Status.main,
    title: `Mover para Principal`,
    message: `Deseja mover ${count} resposta(s) para a aba 'principal? Esta ação não poderá ser desfeita.`,
    mainButton: "Mover",
  },
  [Status.deleted]: {
    action: Status.deleted,
    title: "Apagar respostas",
    message: `Deseja apagar ${count} resposta(s)? Esta ação não poderá ser desfeita.`,
    mainButton: "Apagar",
    isDanger: true,
  },
});
