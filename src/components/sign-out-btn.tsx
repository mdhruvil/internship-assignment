"use client"
import { Button } from "./ui/button";
import {  signOut } from "next-auth/react";

export function SignOutBtn() {
    async function onSignOut() {
        await signOut()
    }
    return <Button onClick={onSignOut}>Sign out</Button>
}