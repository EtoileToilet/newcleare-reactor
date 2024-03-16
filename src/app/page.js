"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { Box, Button } from "@mui/material";
import Calendar from "react-calendar";
import styles from "./Calendar.css";
import { useState } from "react";

export default function Home() {
  const [value, onChange] = useState(new Date()); 
  const router = useRouter();
  const user = useSelector((rootState) => rootState.user);
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
    <div className='text-5xl px-4 py-3'>Home</div>
    <Box className="size-1/2 content-center flex-auto border border-white" suppressHydrationWarning>
      <Calendar className={styles} showWeekNumbers onChange={onChange} value={value}  />
    </Box>
    <div className="text-xl px-4 pt-3 pb-10"></div>
    {!user.id && <>
      <Button sx={{mr:2,}} onClick={signIn}>Đăng nhập</Button>
      <Button sx={{mr:2,}} onClick={register}>Đăng ký</Button>
    </>}
    {!!user.id && <>
      <span className="px-4 pt-3 pb-5">Xin chào, {user.displayName}</span>
      <Button onClick={signOutUser}>Đăng xuất</Button>
      <Button onClick={gotoTest}>Vào ứng dụng</Button>
    </>}    
    
    {/* <button onClick={alertTest} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>how do irish people say good morning?</button>
    <NextButton onClick={alertTest}>hah?</NextButton> */}
    </main>
  )
}
