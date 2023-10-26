"use client";
import { NextButton } from "@app/components/app-button"
import { itemBackendService } from "@app/services/item-backend.service";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MuiAlert from "@mui/material/Alert";
import { Button, FormHelperText, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { sleep } from "@app/utils/sleep";

const Alert = React.forwardRef(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  name: yup.string().required("name, please?"),
  price: yup.number().required("how much is this again?").min(1000, "the only thing cheaper than 1000 dong is probably one candy, and we don't sell candy here"),
  stockye: yup.string().required("clearly we can't have schroedinger's stock here"),
});
export default function SubAppTablemaker() {
  const router = useRouter();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack({
      open: false,
      message: "",
      severity: "success",
    })
  }
  const onSubmit = async (values) => {
    try{
    // e.preventDefault();
    // if (!item.name.trim()) {
    //   alert('name, please?');
    //   return;
    // }
    // if (!item.price) {
    //   alert('how much is this again?');
    //   return;
    // }
    await itemBackendService.createItem({
      ...values,
      price: +values.price,
    });
    //alert("got 'em");
    setSnack({
      open: true,
      message: "got 'em",
      severity: "success"
    });
    await sleep(1000);
    router.push("/subapp");
  } catch(e){
    //alert("this ain't it, chief. care to try again?");
    setSnack({
      open: true,
      message: "this ain't it, chief. care to try again?",
      severity: "error"
    });
    console.error(e);
  }
};
const formik = useFormik({
  initialValues: {
    name: "",
    price: "",
    stockye: "I",
  },
  validationSchema,
  onSubmit,
});
  return (
    <div className="">
      <div className="text-2xl font-bold">add new</div>
      <form onSubmit={formik.handleSubmit}>
        <div>
        <TextField id="name" label="name" variant="standard" value={formik.values.name} autoFocus onChange={formik.handleChange}
        ></TextField>
        {formik.touched.name && formik.errors.name && (
        <FormHelperText error>{formik.errors.name}</FormHelperText>
        )}</div>
        <div>
        <TextField id="price" label="price" type="number" variant="standard" value={formik.values.price} onChange={formik.handleChange}
        ></TextField>
        {formik.touched.price && formik.errors.price && (
        <FormHelperText error>{formik.errors.price}</FormHelperText>
        )}</div>
        <RadioGroup aria-label="stockye" name="stockye" defaultValue={formik.values.stockye} onChange={(e) => {
          formik.setFieldValue("stockye", e.target.value);
          console.log(e.target.value)
        }}>
          <FormControlLabel value="I" control={<Radio />} label="in stock" />
          <FormControlLabel value="O" control={<Radio />} label="out of stock" />
        </RadioGroup>
        <Button type="submit">save</Button>
      </form>
      {snack.open && <Snackbar open={snack.open} autoHideDuration={4000} onClose={handleClose}>
              <Alert
              onClose={handleClose}
              severity={snack.severity}
              sx={{width: "100%",}}
              >{snack.message}</Alert>
            </Snackbar>}
    </div>
  )
}
