"use client";
import { itemBackendService } from "@app/services/item-backend.service";
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
import { Box, Button, Icon, IconButton, InputAdornment, SvgIcon, TablePagination } from "@mui/material";
import { ArrowUpward, ArrowDownward, Delete, Edit, Search } from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SubApp() {
  const theme = useContext(ThemeContext);
  const [searchResult, setSearchResult] = useState({
    data: [],
    total: 0,
  });
  const [filters, setFilters] = useState({
    searchTerm: "",
    gender: "",
    state: "0",
  });
  const [searchTermDebounced] = useDebounce(filters.searchTerm.toLowerCase(), 300);
  const [pagination, setPagination] = useState({
  itemsPerPage: 10,
  pageIndex: 0,
  });
  const router = useRouter();
  const addNew = () => {router.push("/subapp/add-to-table");};
  const modItem = (id) => {router.push(`/subapp/${id}`);};
  const getStockStatus = (value) => {
    if (value === "Nam") {
      return "Nam";
    }
    if (value === "Nữ") {
      return "Nữ";
    }
    return "";
  };
  const lookforItems = async () => {
    const result = await itemBackendService.searchItem(filters, pagination);
    setSearchResult(result);
    console.log(result, filters, pagination);
  };
  const confirmDeletion = (item) => {
    if (!window.confirm(`you sure about this?`)){
      return;
    }
    itemBackendService.deleteItem(item.id);
    alert('there you have it');
    refreshPage();
    lookforItems();
  }
  const crAsc = async () => {
    filters.state = "1"
    lookforItems();
  }
  const crDesc = async () => {
    filters.state = "2"
    lookforItems();
  }
  const updAsc = async () => {
    filters.state = "3"
    lookforItems();
  }
  const updDsc = async () => {
    filters.state = "4"
    lookforItems();
  }
  const reset = async () => {
    filters.state = "0"
    lookforItems();
  }
const handlePageChange = useEffect(() => {
  if (pagination.pageIndex < 0) {
    pagination.pageIndex = 0;
  }
})
  useEffect(() => {
    setPagination({
      ...pagination,
      pageIndex: 0,
    })
    lookforItems();
  }, [filters.gender, searchTermDebounced]);
  useEffect(() => {
    lookforItems();
  }, [pagination.pageIndex]);
  return (
    <>
    <Box className="border border-solid border-pink-500 p-4" alignItems="center" justifyContent="center" display="flex">
    <div className="">
      <div className="m-2 text-2xl text-center">what do you want to do?</div>
      <div>
        <div className="text-center"><TextField id="searchTerm" label="search" variant="standard" InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon>
                    <SvgIcon component={Search}/>
                  </Icon>
                </InputAdornment>              
              )
            }} defaultValue={filters.searchTerm} onChange={(e) => {
        setFilters({
        ...filters,
          searchTerm: e.target.value,
        })
      }}></TextField></div>
        <span><RadioGroup aria-label="gender" name="gender" defaultValue={filters.gender} onChange={(e) => {
          setFilters({
            ...filters,
            gender: e.target.value,
          })
        }}><div className="text-center pt-4">
            <span><FormControlLabel value="" control={<Radio />} label="all" /></span>
            <span><FormControlLabel value="Nam" control={<Radio />} label="Nam" /></span>
            <span><FormControlLabel value="Nữ" control={<Radio />} label="Nữ" /></span>
            </div>
        </RadioGroup></span></div>
      <div className="pt-4 text-center"><Button onClick={addNew}>add new</Button></div>
      <div className="pt-4 text-center"><Button onClick={reset}>reset sort</Button></div>
      </div>
    </Box>
    <Box className="border border-solid border-pink-500 p-4">
      <div>
      <TableContainer component={Paper} sx={{ border: 6 }}>
            <Table sx={{ minWidth: 900, border: 3 }} aria-label="simple table" size="medium">
              <TableHead>
                <TableRow> 
                  <TableCell sx={{minWidth:120, border:3, padding: 1}} align="center">Name</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">PID</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Gender</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">DOB</TableCell>
                  <TableCell sx={{minWidth:200, border:3, padding: 1}} align="center">Address</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center" className="w-32">Phone</TableCell>
                  <TableCell sx={{minWidth:150, border:3, padding: 1}} align="center">ICD10</TableCell>
                  <TableCell align="center" sx={{minWidth: 1200, border:3, padding: 1}}>Medical history</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Onset symptom date</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Diagnosis date</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Tiền sử bệnh bản thân, gia đình</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Nơi sinh thiết</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Đường sinh thiết</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Biến chứng gãy xương bệnh lý</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Kích thước u trên MRI</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Skip lesion</TableCell>
                  <TableCell sx={{minWidth:100, border:3, padding: 1}} align="center">Tỷ lệ chu vi u so chi đối diện (%)</TableCell>
                  <TableCell sx={{minWidth:150, border:3, padding: 1}} align="center">
                    Ngày tạo 
                    <div><IconButton onClick={crAsc}>
                      <ArrowUpward/>
                    </IconButton>
                    <IconButton onClick={crDesc}>
                      <ArrowDownward/>
                    </IconButton></div>
                  </TableCell>
                  <TableCell sx={{minWidth:175, border:3, padding: 1}} align="center">
                    Ngày sửa đổi lần cuối
                    <div><IconButton onClick={updAsc}>
                      <ArrowUpward/>
                    </IconButton>
                    <IconButton onClick={updDsc}>
                      <ArrowDownward/>
                    </IconButton></div>
                  </TableCell>
                  <TableCell sx={{minWidth:300, border:3, padding: 1}} align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResult.data.map((item) => (
                  // <div key={item.id} className="border border-dashed border-pink-500 p-2 mt-2">
                  //   <div>name: {item.name}</div>
                  //   <div>pid: {item.pid}</div>
                  //   <div>status: {getStockStatus(item.gender)}</div>
                  //   <div>
                  //     <Button color="primary" startIcon={<SvgIcon component={Edit}/>} onClick={() => modItem(item.id)}>edit</Button>
                  //     <Button color="error" startIcon={<SvgIcon component={Delete}/>} onClick={() => confirmDeletion(item)}>delete</Button>
                  //   </div>
                  // </div>
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                  >
                    
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.name}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.pid}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{getStockStatus(item.gender)}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.dob}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.address}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.phone}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.icd10}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="justify">{item.med_history}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.osd}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.diagdate}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.med_records}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.biopsy_location}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.biopsy}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.broken_bones_complications}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.tumor_size}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.skip_lesion}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.tumor_vs_limb}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.createdAt}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">{item.updatedAt}</TableCell>
                    <TableCell sx={{border:1, padding: 1}} align="center">
                      <div><Button style={{justifyContent: 'center'}} color="info" startIcon={<SvgIcon component={Edit}/>} onClick={() => modItem(item.id)}>edit</Button>
                      <Button style={{justifyContent: 'center'}} color="error" startIcon={<SvgIcon component={Delete}/>} onClick={() => confirmDeletion(item)}>delete</Button></div>
                    </TableCell>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
      </TableContainer>
      </div>
        
        <div className="pt-3">
          {<AppPagination {...pagination} total={searchResult.total} setPageIndex={(newPageIndex) => {
          setPagination({
          ...pagination,
            pageIndex: newPageIndex,
          })
        }}></AppPagination>}
      </div>
    </Box>
    </>
  )
}
