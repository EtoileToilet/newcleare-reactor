"use client";
import { NextButton } from "@app/components/app-button";
import { itemService } from "@app/services/item.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { AppPagination } from "@app/components/app-pagination";
import { useDebounce } from "use-debounce";
export default function SubApp() {
  const [searchResult, setSearchResult] = useState({
    data: [],
    total: 0,
  });
  const [filters, setFilters] = useState({
    searchTerm: "",
    stockye: "",
  });
  const [searchTermDebounced] = useDebounce(filters.searchTerm, 300);
  const [pagination, setPagination] = useState({
  itemsPerPage: 5,
  pageIndex: 0,
  });
  const router = useRouter();
  const addNew = () => {router.push("/subapp/add-to-table");};
  const modItem = (id) => {router.push(`/subapp/${id}`);};
  const getStockStatus = (value) => {
    if (value === "I") {
      return "in stock";
    }
    if (value === "O") {
      return "out of stock";
    }
    return "";
  };
  const lookforItems = async () => {
    const result = await itemService.searchItem(filters, pagination);
    setSearchResult(result);
  };
  const confirmDeletion = (item) => {
    if (!window.confirm(`you sure about this?`)){
      return;
    }
    itemService.deleteItem(item.id);
    alert('there you have it');
    lookforItems();
  }
  useEffect(() => {
    setPagination({
      ...pagination,
      pageIndex: 0,
    })
    lookforItems();
  }, [filters.stockye, searchTermDebounced]);
  useEffect(() => {
    lookforItems;
  }, [pagination.pageIndex]);
  return (
    <div className="">
      <div className="m-2 text-lg">what do you want to do?</div>
      <NextButton onClick={addNew}>add new</NextButton>
      <div>
        <div>
          <div className="text-lg">search</div>
        </div>
        <div>
          <input type="text" name="searchTerm" className="border border-pink-500 p-2 text-black" defaultValue={filters.searchTerm} onChange={(e) => setFilters}></input>
        </div>
        <div>
        <label htmlFor="all" className="mr-3">
          <input type="radio" id="all" name="stockye" className="mr-2" value={""} checked={filters.stockye === ""} onChange={(e) => {
            setFilters({
              ...filters,
              stockye: e.target.value,
            })
          }}/>
          all
          </label>
          <label htmlFor="stock" className="mr-3">
          <input type="radio" id="stock" name="stockye" className="mr-2" value={"I"} checked={filters.stockye === "I"} onChange={(e) => {
            setFilters({
              ...filters,
              stockye: e.target.value,
            })
          }}/>
          in stock 
          </label>
          <label htmlFor="nostock">
          <input type="radio" id="nostock" name="stockye" className="mr-2" value={"O"} checked={filters.stockye === "O"} onChange={(e) => {
            setFilters({
              ...filters,
              stockye: e.target.value,
            })
          }}/>
          out of stock 
          </label>
        </div>
      </div>
      <div>
        {searchResult.data.map((item) => (
          <div key={item.id} className="border border-dashed border-pink-500 p-2 mt-2">
            <div>name: {item.name}</div>
            <div>price: {item.price}</div>
            <div>status: {getStockStatus(item.stockye)}</div>
            <div><NextButton color="blue"onClick={() => modItem(item.id)}>edit</NextButton></div>
            <div><NextButton color="red" onClick={() => confirmDeletion(item)}>delete</NextButton></div>
          </div>
        ))}
        <AppPagination {...pagination} total={searchResult.total} setPageIndex={(newPageIndex) => {
          setPagination({
          ...pagination,
            pageIndex: newPageIndex,
          })
        }}></AppPagination>
      </div>
    </div>
  )
}
