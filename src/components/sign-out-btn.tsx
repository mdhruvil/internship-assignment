"use client"
import { ExitIcon } from "@radix-ui/react-icons";
import { Button, type ButtonProps } from "./ui/button";
import {  signOut } from "next-auth/react";



export function SignOutBtn(props: ButtonProps) {
    async function onSignOut() {
        await signOut()
    }
    return <Button onClick={onSignOut} {...props}>
        <ExitIcon className="mr-2" />
        Sign out
        </Button>
}