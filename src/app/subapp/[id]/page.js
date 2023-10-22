"use client";
import { NextButton } from "@app/components/app-button"
import { itemService } from "@app/services/item.service";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from "@mui/material";
export default function EditItem({ params }) {
  console.log(params.id);
  const router = useRouter();
  const [item, setItem] = useState({
    id: undefined,
    name: "",
    price: "",
    stockye: "I",
  });
  const onSubmit = async (e) => {
    try{
    e.preventDefault();
    if (!item.name.trim()) {
      alert('name, please?');
      return;
    }
    if (!item.price) {
      alert('how much is this again?');
      return;
    }
    await itemService.updateItem(item);
    alert("got 'em");
    router.push("/subapp");
  } catch(e){
    alert("this ain't it, chief. care to try again?");
    console.error(e);
  }
};
useEffect(() => {
    const searchItem = async () => {
        const item = await itemService.searchItemById(+params.id);
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
      <div className="text-2xl font-bold">edit</div>
      <form onSubmit={onSubmit}>
        <TextField id="name" label="name" defaultValue={item.name} onChange={(e) => {
          setItem({
          ...item,
            name: e.target.value,
          })
        }}></TextField>
        <TextField id="price" label="price" type="number" defaultValue={item.price} onChange={(e) => {
          setItem({
         ...item,
         price: e.target.value,
          })
        }}></TextField>
        <RadioGroup aria-label="stockye" name="stockye" defaultValue={item.stockye} onChange={(e) => {
          setItem({
            ...item,
            stockye: e.target.value,
          })
        }}>
          <FormControlLabel value="I" control={<Radio />} label="in stock" />
          <FormControlLabel value="O" control={<Radio />} label="out of stock" />
        </RadioGroup>
        <Button  type="submit">save</Button>
      </form>
    </div>
  )
}