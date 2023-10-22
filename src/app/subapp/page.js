"use client";
import { NextButton } from "@app/components/app-button";
import { itemService } from "@app/services/item.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { AppPagination } from "@app/components/app-pagination";
import { useDebounce } from "use-debounce";
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme.context";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Button, SvgIcon } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function SubApp() {
  const theme = useContext(ThemeContext);
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
    console.log(result, filters, pagination);
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
    lookforItems();
  }, [pagination.pageIndex]);
  return (
    <>
    <Box>
    <div className="">
      <div>theme: {theme}</div>
      <div className="m-2 text-lg">what do you want to do?</div>
      <Button onClick={addNew}>add new</Button>
      <TextField id="searchTerm" variant="standard" defaultValue={filters.searchTerm} onChange={(e) => {
        setFilters({
        ...filters,
          searchTerm: e.target.value,
        })
      }}></TextField>
              <RadioGroup aria-label="stockye" name="stockye" defaultValue={filters.stockye} onChange={(e) => {
          setFilters({
            ...filters,
            stockye: e.target.value,
          })
        }}>
          <FormControlLabel value="" control={<Radio />} label="all" />
          <FormControlLabel value="I" control={<Radio />} label="in stock" />
          <FormControlLabel value="O" control={<Radio />} label="out of stock" />
        </RadioGroup>
      </div>
    </Box>
    <Box>
      <div>
        {searchResult.data.map((item) => (
          <div key={item.id} className="border border-dashed border-pink-500 p-2 mt-2">
            <div>name: {item.name}</div>
            <div>price: {item.price}</div>
            <div>status: {getStockStatus(item.stockye)}</div>
            <div><Button  color="primary" startIcon={<SvgIcon component={Edit}/>} onClick={() => modItem(item.id)}>edit</Button></div>
            <div><Button  color="error" startIcon={<SvgIcon component={Delete}/>} onClick={() => confirmDeletion(item)}>delete</Button></div>
          </div>
        ))}
        <AppPagination {...pagination} total={searchResult.total} setPageIndex={(newPageIndex) => {
          setPagination({
          ...pagination,
            pageIndex: newPageIndex,
          })
        }}></AppPagination>
      </div>
    </Box>
    </>
  )
}
