"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader as HomeIcon } from "react-feather";
import { useTranslation } from "react-i18next";

import { MakeRequired } from "@forms/types/global/makeRequired";

import { useTableData } from "@app/store/tableData";
import { UserSession } from "@app/types";

import SignInButton from "../SignInButton";
import SettingsMenu from "./SettingsMenu";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const { data: session, status } = useSession();

  const { title } = useTableData();

  const { t } = useTranslation();

  const isLoading = status === "loading";

  const getPageTitle = () => {
    if (isLoading) return "";

    const page = pathname.split("/")[1];
    if (!session) return t("home.navbar.admin");
    if (page === "create") return t("home.navbar.create");
    if (page === "responses")
      return `${t("home.navbar.responses")}: ${title.toLocaleUpperCase()}`;
    if (page === "edit") return t("home.navbar.edit");
    if (page === "") return t("home.navbar.home");
  };

  return (
    <nav className="h-18 border-b border-gray-200 shadow-md bg-gray-50 sticky top-0 z-10">
      <div className="flex items-center h-100 p-4">
        <Link href={"/"} aria-label="home">
          <HomeIcon />
        </Link>
        {!isLoading && (
          <>
            <p className="ml-4 mr-auto font-bold">{getPageTitle()}</p>
            {session?.user ? (
              <SettingsMenu
                session={session as MakeRequired<UserSession, "user">}
                isPrimary
              />
            ) : (
              <SignInButton isPrimary />
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
