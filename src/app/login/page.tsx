"use client";

import LoginPage from "@/components/login/googleLogin";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginRoute() {
  const [loginDrawerOpened, { toggle: toggleLoginDrawer }] =
    useDisclosure(true);
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/");
  //   toggleLoginDrawer();
  // }, []);
  return (
    <div>
      <LoginPage opened={loginDrawerOpened} onClose={toggleLoginDrawer} />
    </div>
  );
}
