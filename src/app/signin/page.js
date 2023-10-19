"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { NextButton } from "@app/components/app-button";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Button, IconButton, InputAdornment, Snackbar } from "@mui/material";
import { Box } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { sleep } from "@app/utils/sleep";
import { useFormik } from "formik";
import * as yup from "yup";
import FormHelperText from '@mui/material/FormHelperText';
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Alert = React.forwardRef(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const passwordRegex = 
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validationSchema = yup.object({
  email: yup.string().required("what? did you get your identity stolen or something?").email("i've seen a lot of emails, and i'm pretty sure yours doesn't look like one"),
  password: yup.string().required("you wanna leave your data unsecured in the open or what?").matches(passwordRegex, "at least 8 characters, one lowercase, one uppercase, one number, one special character and i'll let you in"),
})

export default function SignIn() {
    const router = useRouter();
    // const [signInData, setSignInData] = useState({
    //   email: "",
    //   password: "",
    // });
    const [snack, setSnack] = useState({
      open: false,
      message: "",
      severity: "success",
    });

    const [showPassword, setShowPassword] = useState();

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

    const onSubmit = async (values) => {
      try{
      if (!values.email) {
        //alert('email, please?');
        setSnack({
          open: true,
          message: "email, please?",
          severity: "error",
        })
        return;
      }
      if (!values.password) {
        //alert("surely you know that a password field can't be blank, no?");
        setSnack({
          open: true,
          message: "surely you know that a password field can't be blank, no?",
          severity: "error",
        });
        return;
      }
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setSnack({
        open: true,
        message: "welcome back",
        severity: "success",
      });
      await sleep(1500);
      router.push('/')
    } catch(e){
      alert(e.message);
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
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <div className="text-center">
        <div className="text-lg">sign in</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-2 flex flex-col gap-1 w-96">  
          <TextField required id="email" label="email" variant="standard" value={formik.values.email} onChange={formik.handleChange}></TextField>
          {formik.touched.email && formik.errors.email && (
          <FormHelperText error>{formik.errors.email}</FormHelperText>)}
          </div>
          <div className="p-2 flex flex-col gap-1 w-96">
            <TextField required type={showPassword?"text":"password"} id="password" label="password" variant="standard" value={formik.values.password} onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} size="small" tabIndex={-1}>
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>              
              )
            }}></TextField>
            {formik.touched.email && formik.errors.password && (
          <FormHelperText error>{formik.errors.password}</FormHelperText>)}
          </div>
          <div className="p-2 w-30 flex-col gap-1">
            <Button className="mt-2" type="submit">sign in</Button>
            </div>
            </form>
            <div>
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