"use client";

import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
} from "react-feather";

import { useTranslation } from "@app/i18n/client";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  const { status } = useSession();

  const [_, path, formId] = pathname.split("/");

  const { t } = useTranslation();

  const router = useRouter();

  const isLoading = status === "loading";

  const getPageName = () => {
    switch (path) {
      case "create":
        return t("home.navbar.create");
      case "responses":
        return t("home.navbar.responses");
      case "edit":
        return t("home.navbar.edit");
      default:
        return "";
    }
  };

  const pageName = getPageName();

  return path && !isLoading && pageName ? (
    <div className="flex pt-4 px-4">
      <ChakraBreadcrumb
        spacing={2}
        separator={<ChevronRightIcon color="gray" size={16} />}
        color="gray.500"
        mr="auto"
      >
        <BreadcrumbItem>
          <BreadcrumbLink _hover={{ color: "gray.700" }} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink fontWeight={"medium"}>{pageName}</BreadcrumbLink>
        </BreadcrumbItem>
      </ChakraBreadcrumb>
      {path !== "create" && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label={t("commons.more")}
            icon={<MenuIcon />}
            variant="unstyled"
            h={8}
          />
          <MenuList>
            {path === "responses" && (
              <MenuItem onClick={() => router.push(`/edit/${formId}`)}>
                {`${t("commons.edit")} ${t(
                  "commons.form"
                ).toLocaleLowerCase()}`}
              </MenuItem>
            )}
            {formId && path !== "responses" && (
              <MenuItem onClick={() => router.push(`/responses/${formId}`)}>
                {`${t("commons.see")} ${t(
                  "commons.responses"
                ).toLocaleLowerCase()}`}
              </MenuItem>
            )}
            {formId && (
              <MenuItem
                as={Link}
                href={`${process.env.NEXT_PUBLIC_FORMS_URL}/${formId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${t("commons.open")} ${t(
                  "commons.form"
                ).toLocaleLowerCase()}`}
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      )}
    </div>
  ) : null;
};

export default Breadcrumb;
