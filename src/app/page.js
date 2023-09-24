"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NextButton } from "@app/components/app-button";

export default function Home() {
  const router = useRouter();
  const gotoTest = () => {router.push("/subapp");};
  const alertTest = () => {
    alert("top o' the mornin' to ya");
  };
  return (
    <main className=''>
    <div className='text-3xl px-4 py-5'>Home</div>
    <button onClick={gotoTest} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>go to subapp</button>
    <button onClick={alertTest} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>how do irish people say good morning?</button>
    <NextButton onClick={alertTest}>hah?</NextButton>
    </main>
  )
}
