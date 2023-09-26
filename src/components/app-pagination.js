import { NextButton } from "@app/components/app-button";

export const AppPagination = ({ 
    itemsPerPage, 
    pageIndex, 
    total, 
    setPageIndex 
}) => {
    const lastPageIndex = Math.ceil(total / itemsPerPage) - 1;
    const totalPage = lastPageIndex === - 1 ? 1 : lastPageIndex + 1;
    return (
        <div>
            <NextButton 
            color={pageIndex === 0 ?"black": 'blue'} 
            disabled={pageIndex === 0}
            onClick={() => setPageIndex(pageIndex - 1)}
            >
                prev
            </NextButton>
            <span>
                page {pageIndex + 1} out of {totalPage}
            </span>
            <NextButton 
            color={
                pageIndex === lastPageIndex || lastPageIndex === - 1 ? "black": 'blue'
            } 
            disabled={pageIndex === lastPageIndex || lastPageIndex === - 1}
            onClick={() => setPageIndex(pageIndex + 1)}
            >
                next
            </NextButton>
            <span>total: {total} items</span>            
        </div>
    );
}