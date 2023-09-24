import { AppButton } from "@app/components/app-button";

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
            <AppButton 
            color={pageIndex === 0 ?"blue": 'black'} 
            disabled={pageIndex === 0}
            onClick={() => setPageIndex(pageIndex - 1)}
            >
                prev
            </AppButton>
            <span>
                page {pageIndex + 1} out of {totalPage}
            </span>
            <AppButton 
            color={
                pageIndex === lastPageIndex || lastPageIndex === - 1 ? "blue": 'black'
            } 
            disabled={pageIndex === lastPageIndex || lastPageIndex === - 1}
            onClick={() => setPageIndex(pageIndex + 1)}
            >
                next
            </AppButton>
            <span>total: {total} items</span>            
        </div>
    );
}