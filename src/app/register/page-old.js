"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { NextButton } from "@app/components/app-button";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Button, Snackbar } from "@mui/material";
import { Box } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { sleep } from "@app/utils/sleep";
import { useFormik } from "formik";

const Alert = React.forwardRef(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Register() {
    const router = useRouter();
    const [signInData, setSignInData] = useState({
      email: "",
      password: "",
    });
    const [snack, setSnack] = useState({
      open: false,
      message: "",
      severity: "success",
    });

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSnack({
        open: false,
        message: "",
        severity: "success",
      });
    };

    const onSubmit = async (e) => {
      try{
      e.preventDefault();
      if (!signInData.email) {
        //alert('email, please?');
        setSnack({
          open: true,
          message: "email, please?",
          severity: "error",
        })
        return;
      }
      if (!signInData.password) {
        //alert("surely you know that a password field can't be blank, no?");
        setSnack({
          open: true,
          message: "surely you know that a password field can't be blank, no?",
          severity: "error",
        });
        return;
      }
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, signInData.email, signInData.password);
      setSnack({
        open: true,
        message: "welcome aboard",
        severity: "success",
      });
      await sleep(1500);
      router.push('/')
    } catch(e){
      //alert(e.message);
      let errorMessage = e.message;
      if (e.code === "auth/invalid-login-credentials") {
        errorMessage = "something smells fishy. maybe recheck your credentials?"
      }
      if (e.code === "auth/invalid-email") {
        errorMessage = "i've seen a lot of emails, and i'm pretty sure yours isn't one"
      }
      setSnack({
        open: true,
        message: errorMessage,
        severity: "error",
      });
      console.error(e);
    }
  };
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <div className="text-center">
        <div className="text-lg">register</div>
          <div className="p-2 flex flex-col gap-1 w-96">
          <TextField required id="email" label="email" variant="standard" value={signInData.email} onChange={(e) => {
            setSignInData({
             ...signInData,
               email: e.target.value,
            });
          }}></TextField>
          </div>
          <div className="p-2 flex flex-col gap-1 w-96">
            <TextField required type="password" id="password" label="password" variant="standard" value={signInData.password} onChange={(e) => {
              setSignInData({
              ...signInData,
                password: e.target.value,
              });
            }}></TextField>
          </div>
          <div className="p-2 w-30 flex-col gap-1">
            <Button className="mt-2"  onClick={onSubmit}>register</Button>
            {snack.open && <Snackbar open={snack.open} autoHideDuration={4000} onClose={handleClose}>
              <Alert
              onClose={handleClose}
              severity={snack.severity}
              sx={{width: "100%",}}
              >{snack.message}</Alert>
            </Snackbar>}
          </div>
      </div>
      </Box>
    )
}