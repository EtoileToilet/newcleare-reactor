import { NextButton } from "@app/components/app-button";
import { Box, Button } from "@mui/material";

export const AppPagination = ({ 
    itemsPerPage, 
    pageIndex, 
    total, 
    setPageIndex 
}) => {
    const lastPageIndex = Math.ceil(total / itemsPerPage) - 1;
    const totalPage = lastPageIndex === - 1 ? 1 : lastPageIndex + 1;
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
        <div className="content-center">
            <Button 
            color={pageIndex === 0 ?"secondary": 'primary'} 
            disabled={pageIndex === 0}
            onClick={() => setPageIndex(pageIndex - 1)}
            >
                prev
            </Button>
            <span className="px-4">
                page {pageIndex + 1} out of {totalPage}
            </span>
            <Button 
            color={
                pageIndex === lastPageIndex || lastPageIndex === - 1 ? "secondary": 'primary'
            } 
            disabled={pageIndex === lastPageIndex || lastPageIndex === - 1}
            onClick={() => setPageIndex(pageIndex + 1)}
            >
                next
            </Button>
            <span>total: {total} items</span>            
        </div>
        </Box>
    );
}