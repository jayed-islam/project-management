"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/zustand/auth-state";
import { paths } from "@/layouts/paths";
import { checkTokenValidity } from "@/utils/app-utils";
import { message } from "antd";

interface IAuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<IAuthGuardProps> = ({ children }) => {
  const logOut = useAuthStore((state) => state.logOut);
  const router = useRouter();

  useEffect(() => {
    const isVerified = checkTokenValidity();
    if (!isVerified) {
      logOut();
      message.error("Tokes has expired");
      router.push(paths.auth.signin);
    }
  }, [logOut, router]);

  return <>{children}</>;
};

export default AuthGuard;
