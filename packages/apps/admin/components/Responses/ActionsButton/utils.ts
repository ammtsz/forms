import { t } from "i18next";

import { Status, StatusTypes } from "@app/constants/status";

import { ConfirmationTexts } from "../../ConfirmationModal";

export const getConfirmationTexts = (
  count: number
): { [key: StatusTypes]: ConfirmationTexts } => ({
  [Status.main]: {
    action: Status.main,
    title: t("responses.buttons.moveToMain"),
    message: `${t("confirmations.moveResponse", { count })} ${t(
      "confirmations.cantBeUndone"
    )}`,
    mainButton: t("commons.move"),
  },
  [Status.deleted]: {
    action: Status.deleted,
    title: t("responses.buttons.deleteResponses"),
    message: `${t("confirmations.deleteResponse", { count })} ${t(
      "confirmations.cantBeUndone"
    )}`,
    mainButton: t("commons.delete"),
    isDanger: true,
  },
});
