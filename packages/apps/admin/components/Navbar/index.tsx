"use client";

import { Switch } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader as HomeIcon } from "react-feather";
import { useTranslation } from "react-i18next";

import SignInButton from "../SignInButton";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();

  const pathname = usePathname();

  const { i18n, t } = useTranslation();

  const isLoading = status === "loading";

  const getPageTitle = () => {
    if (isLoading) return "";

    const page = pathname.split("/")[1];
    if (!session) return t("home.navbar.admin");
    if (page === "create") return t("home.navbar.create");
    if (page === "responses") return t("home.navbar.responses");
    if (page === "edit") return t("home.navbar.edit");
    if (page === "") return t("home.navbar.home");
  };

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.checked ? "en" : "br");
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
            <div className="ml-4">
              br
              <Switch onChange={handleLanguageChange} />
              en
            </div>
            <SignInButton session={session} isPrimary />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
