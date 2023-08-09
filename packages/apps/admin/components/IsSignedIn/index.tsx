import { useSession } from "next-auth/react";
import React from "react";

const IsSignedIn: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { data: session } = useSession();

  return session?.user ? (
    children
  ) : (
    <main>
      Faca o login para continuar <button className="primary_btn">Login</button>
    </main>
  );
};

export default IsSignedIn;
