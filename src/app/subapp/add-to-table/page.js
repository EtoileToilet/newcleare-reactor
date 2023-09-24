"use client";
import { NextButton } from "@app/components/app-button"
import { itemService } from "@app/services/item.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SubAppTablemaker() {
  const router = useRouter();
  const [item, setItem] = useState({
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
    await itemService.createItem(item);
    alert("got 'em");
    router.push("/subapp");
  } catch(e){
    alert("this ain't it, chief. care to try again?");
    console.error(e);
  }
};
  return (
    <div className="">
      <div className="text-2xl font-bold">add new</div>
      <form onSubmit={onSubmit}>
        <div>
          <label className="inline-block w-20" htmlFor="name">name</label>
          <input className="border border-pink-500 text-black" type="text" id="name" name="name" defaultValue={item.name} onChange={(e) => {
            setItem({
              ...item,
              name: e.target.value,
            })
          }}/>
        </div>
        <div className="mt-2">
          <label className="inline-block w-20" htmlFor="price">price</label>
          <input className="border border-pink-500 text-black" type="number" id="price" name="price" defaultValue={item.price} onChange={(e) => {
            setItem({
              ...item,
              price: e.target.value,
            })
          }}/>
        </div>
        <div>
          <label htmlFor="stock" className="mr-3">
          <input type="radio" id="stock" name="stockye" className="mr-2" value={"I"} checked={item.stockye === "I"} onChange={(e) => {
            setItem({
              ...item,
              stockye: e.target.value,
            })
          }}/>
          in stock 
          </label>
          <label htmlFor="nostock">
          <input type="radio" id="nostock" name="stockye" className="mr-2" value={"O"} checked={item.stockye === "O"} onChange={(e) => {
            setItem({
              ...item,
              stockye: e.target.value,
            })
          }}/>
          out of stock 
          </label>
        </div>
        <NextButton type='submit' className={'mt-2'}>save</NextButton>
      </form>
    </div>
  )
}
