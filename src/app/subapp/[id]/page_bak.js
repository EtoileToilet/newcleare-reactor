"use client";
import { NextButton } from "@app/components/app-button"
import { itemBackendService } from "@app/services/item-backend.service";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Button } from "@mui/material";
import { useFormik, enableReinitialize } from "formik";
export default function EditItem({ params }) {
  console.log(params.id);
  const router = useRouter();
  const [item, setItem] = useState({
    id: undefined,
    name: "",
    pid: "",
    gender: "Nam",
    dob: "",
    address: "",
    phone: "",
    icd10: "",
    med_history: "",
    osd: '',
    diagdate: '',
    med_records: "",
    biopsy_location: "",
    biopsy: "",
    broken_bones_complications: "",
    tumor_size: "",
    skip_lesion: "",
    tumor_vs_limb: "",
  });
  const onSubmit = async (e) => {
    try{
    e.preventDefault();
    if (!item.name.trim()) {
      alert('name, please?');
      return;
    }
    if (!item.pid) {
      alert('how much is this again?');
      return;
    }
    await itemBackendService.updateItem(item);
    alert("got 'em");
    router.push("/subapp");
  } catch(e){
    alert("this ain't it, chief. care to try again?");
    console.error(e);
  }
};
useEffect(() => {
    const searchItem = async () => {
        const item = await itemBackendService.searchItemById(+params.id);
        if (!item) {
            alert("this doesn't exist!");
            return;
        }
        setItem(item);
    }
    searchItem();
}, []);
if (!item.id){
    return <div>not found</div>;
}
  return (
    <div className="">
      <div className="text-2xl font-bold">edit {params.id}</div>
      <Box alignItems="center" justifyContent="center">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField id="name" label="Họ tên" variant="standard" value={item.name} autoFocus onChange={formik.handleChange}></TextField>
          {formik.touched.name && formik.errors.name && (
            <FormHelperText error>{formik.errors.name}</FormHelperText>
          )}
        </div>
        <div>
          <TextField id="pid" label="PID" type="number" variant="standard" value={item.pid} onChange={formik.handleChange}></TextField>
          {formik.touched.pid && formik.errors.pid && (
            <FormHelperText error>{formik.errors.pid}</FormHelperText>
          )}
        </div>
        <RadioGroup aria-label="Giới tính" name="gender" defaultValue={item.gender} onChange={(e) => {
          formik.setFieldValue("gender", e.target.value);
          console.log(e.target.value)
        }}>
          <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
          <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
        </RadioGroup>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker id="dob" label="Ngày sinh" variant="standard" value={item.dob} onChange={formik.handleChange}></DatePicker>
              {formik.touched.dob && formik.errors.dob && (
                <FormHelperText error>{formik.errors.dob}</FormHelperText>
              )}
          </LocalizationProvider>    
        </div>
        <div>
          <TextField id="address" label="Địa chỉ" variant="standard" defaultValue={item.address} onChange={formik.handleChange}></TextField>
          {formik.touched.address && formik.errors.address && (
            <FormHelperText error>{formik.errors.address}</FormHelperText>
          )}
        </div>
        <div>
        <TextField id="phone" label="SĐT" variant="standard" defaultValue={item.phone} onChange={formik.handleChange}></TextField>
          {formik.touched.phone && formik.errors.phone && (
            <FormHelperText error>{formik.errors.phone}</FormHelperText>
          )}
        </div>
        <div>
        <TextField id="icd10" label="ICD10" variant="standard" multiline rows={4} defaultValue={item.icd10} onChange={formik.handleChange}></TextField>
          {formik.touched.icd10 && formik.errors.icd10 && (
            <FormHelperText error>{formik.errors.icd10}</FormHelperText>
          )}
        </div>
        <div>
        <TextField id="med_history" label="Medical history" variant="standard" multiline rows={10} defaultValue={item.med_history} onChange={formik.handleChange}></TextField>
          {formik.touched.med_history && formik.errors.med_history && (
            <FormHelperText error>{formik.errors.med_history}</FormHelperText>
          )}
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker id="osd" label="Onset symptom date"variant="standard" value={item.osd} onChange={formik.handleChange}></DatePicker>
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker id="diagdate" label="Ngày chẩn đoán" variant="standard" value={item.diagdate} onChange={formik.handleChange}></DatePicker>
          </LocalizationProvider>
        </div>
        <div>
          <TextField id="med_records" label="Tiền sử bệnh bản thân, gia đình" variant="standard" defaultValue={item.med_records} onChange={formik.handleChange}
          helperText="0. Không có gì đặc biệt
          1. Xạ trị
          2. Hóa chất
          3. Tiền sử nhiễm khuẩn
          4. Gia đình >1 người ung thư
          5. Bệnh lý đặc biệt khác đi kèm"></TextField>
        </div>
        <div>
          <TextField id="biopsy_location" label="Nơi sinh thiết" variant="standard" defaultValue={item.biopsy_location} onChange={formik.handleChange}
          helperText="1. Bệnh viện K
          2. Tâm Anh
          3. Vinmec Time City
          4. Vinmec Central Park
          5. Chấn thương chỉnh hình HCM
          6. Ung bướu Hồ Chí Minh
          7. Nhi đồng TP HCM
          8. BV 108
          9. BV Việt Đức
          10. BV khác"></TextField>
        </div>
        <div>
          <TextField id="biopsy" label="Đường sinh thiết" variant="standard" defaultValue={item.biopsy} onChange={formik.handleChange}
          helperText="0. Không sinh thiết
          1. Sinh thiết mở đúng 
          2. Đúng vị trí nhưng dài 
          3. Sai cả vị trí hoặc cách thức sinh thiết
          4. Core needle biopsy"></TextField>
        </div>
        <div>
          <TextField id="broken_bones_complications" label="Biến chứng gãy xương bệnh lý" variant="standard" defaultValue={item.broken_bones_complications} onChange={formik.handleChange}
          helperText="0. Không; 1. Có"></TextField>
        </div>
        <div>
          <TextField id="tumor_size" label="Kích thước khối u" variant="standard" defaultValue={item.tumor_size} onChange={formik.handleChange}></TextField>
        </div>
        <div>
          <TextField id="skip_lesion" label="Skip lesion" variant="standard" defaultValue={item.skip_lesion} onChange={formik.handleChange}
          helperText="0. Không; 1. Có"></TextField>
        </div>
        <div>
          <TextField id="tumor_vs_limb" label="Tỷ lệ chu vi u so chi đối diện" variant="standard" defaultValue={item.tumor_vs_limb} onChange={formik.handleChange}></TextField>
        </div>
        <Button type="submit">save</Button>
      </form>
      </Box>
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