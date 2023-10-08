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
    <div className='text-3xl px-4 py-5'>Home</div>
    {!user.id && <>
      <Button sx={{mr:2,}} onClick={signIn}>sign in</Button>
      <Button sx={{mr:2,}} onClick={register}>register</Button>
    </>}
    {!!user.id && <>
      <div>good day, {user.displayName}</div>
      <Button onClick={signOutUser}>sign out</Button>
      <Button onClick={gotoTest} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>go to subapp</Button>
    </>}    
    
    {/* <button onClick={alertTest} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>how do irish people say good morning?</button>
    <NextButton onClick={alertTest}>hah?</NextButton> */}
    </main>
  )
}
