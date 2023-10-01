"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextButton } from "@app/components/app-button";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
    const router = useRouter();
    const [signInData, setSignInData] = useState({
      email: "",
      password: "",
    });
    const onSubmit = async (e) => {
      try{
        e.preventDefault();
      if (!signInData.email) {
        alert('email, please?');
        return;
      }
      if (!signInData.password) {
        alert("surely you know that a password field can't be blank, no?");
        return;
      }
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, signInData.email, signInData.password);
      router.push('/')
    } catch(e){
      alert(e.message);
      console.error(e);
    }
  };
    return (
      <div className="">
        <div className="text-2xl font-bold">register</div>
        <form>
          <div>
            <label className="inline-block w-20" htmlFor="email">email</label>
            <input className="border border-pink-500 text-black" type="text" id="email" name="email" defaultValue={signInData.email} onChange={(e) => {
              setSignInData({
                ...signInData,
                email: e.target.value,
              })
            }}/>
          </div>
          <div className="mt-2">
            <label className="inline-block w-20" htmlFor="password">password</label>
            <input className="border border-pink-500 text-black" type="password" id="password" name="password" defaultValue={signInData.password} onChange={(e) => {
              setSignInData({
                ...signInData,
                password: e.target.value,
              })
            }}/>
          </div>
          <NextButton type='submit' onClick={onSubmit} className={'mt-2'}>register</NextButton>
        </form>
      </div>
    )
}