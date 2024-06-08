"use client";

import { signIn } from "next-auth/react";
import Google from "./google";
import { Button, type ButtonProps } from "./ui/button";

export function SignInBtn(props: ButtonProps) {
    async function onSignIn(){
        await signIn("google")
    }
  return (
    <Button onClick={onSignIn} {...props}>
      <Google className="mr-2" />
      Login with Google
    </Button>
  );
}
