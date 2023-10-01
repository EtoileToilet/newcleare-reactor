"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { NextButton } from "./app-button";

export const NextGuard = ({children}) => {
const router = useRouter();
const user = useSelector((rootState) => rootState.user);
const signIn = () => {
    router.push("/signin");
  }
if (!user.id) {
    return (
        <>
            <div>auth required, please sign in</div>
            <NextButton onClick={signIn} className='mr-2' color="blue">sign in</NextButton>
        </>)
};  
    return (
    <>{ children }</>
    );
}