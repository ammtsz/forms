"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader as HomeIcon } from "react-feather";

import SignInButton from "../SignInButton";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const pathname = usePathname();

  const getPageTitle = () => {
    const page = pathname.split("/")[1];
    if (!session) return "Admin";
    if (page === "create") return "Novo Formulário";
    if (page === "responses") return "Respostas";
    if (page === "edit") return "Edição de Formulário";
    if (page === "") return "Home";
  };

  return (
    <nav className="h-18 border-b border-gray-200 shadow-md bg-gray-50 sticky top-0 z-10">
      <div className="flex items-center h-100 p-4">
        <Link href={"/"} aria-label="home">
          <HomeIcon />
        </Link>
        <p className="ml-4 mr-auto font-bold">{getPageTitle()}</p>
        <SignInButton session={session} isPrimary />
      </div>
    </nav>
  );
};

export default Navbar;
