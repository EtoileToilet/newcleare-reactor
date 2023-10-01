"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NextButton } from "@app/components/app-button";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

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
    <main className=''>
    <div className='text-3xl px-4 py-5'>Home</div>
    {!user.id && <>
      <button onClick={signIn} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>sign in</button>
      <button onClick={register} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>register</button>
    </>}
    {!!user.id && <>
      <div>good day, {user.displayName}</div>
      <button onClick={signOutUser} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>sign out</button>
    </>}    
    <button onClick={gotoTest} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>go to subapp</button>
    <button onClick={alertTest} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>how do irish people say good morning?</button>
    <NextButton onClick={alertTest}>hah?</NextButton>
    </main>
  )
}
