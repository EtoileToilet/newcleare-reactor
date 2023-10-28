"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NextButton } from "@app/components/app-button";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const user = useSelector(rootState => rootState.user)
  const gotoTest = () => {router.push("/subapp");};
  const alertTest = () => {
    alert("top o' the mornin' to ya");
  };
  const signIn = () => {
    router.push("/signin");
  }
  const register = () => {
    router.push("/register");
  }
  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth);
    //alert("under construction. you're trapped in here with me now, hehehe");
  }
  return (
    <main className='text-center'>
    <div className='text-5xl px-4 py-3'>home</div>
    <div className="text-xl px-4 pt-3 pb-10">*insert a really cool tagline that i can&apos;t think of yet here*</div>
    {!user.id && <>
      <Button sx={{mr:2,}} onClick={signIn}>sign in</Button>
      <Button sx={{mr:2,}} onClick={register}>register</Button>
    </>}
    {!!user.id && <>
      <span className="px-4 pt-3 pb-5">good day, {user.displayName}</span>
      <Button onClick={signOutUser}>sign out</Button>
      <Button onClick={gotoTest}>go to subapp</Button>
    </>}    
    
    {/* <button onClick={alertTest} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>how do irish people say good morning?</button>
    <NextButton onClick={alertTest}>hah?</NextButton> */}
    </main>
  )
}
