"use client";
import { useRouter } from "next/navigation";
export default function SubApp() {
  const router = useRouter();
  const addNew = () => {router.push("/subapp/add-to-table");};
  const alertTest = () => {
    alert("top o' the mornin' to ya");
  };
  return (
    <div className="">
      <div className="m-2 p-4">what do you want to do?</div>
      <button onClick={addNew} className='border border-solid py-2 px-4 rounded-full border-pink-500 mr-2'>add new</button>
    </div>
  )
}
