let itemList = [];
if (typeof window !== 'undefined') {
    itemList = JSON.parse(localStorage.getItem('itemList')) || [];
};
const getNewId = () => {
    return Math.max(...itemList.map((s) => s.id), 0) + 1;
  };
const searchItem = async (filters, pagination) => {
    let filteredItems = itemList;
    const searchTerm = filters.searchTerm?.trim().toLowerCase();
    if (filters.searchTerm.trim()) {
        filteredItems = filteredItems.filter((s) => s.name.toLowerCase().includes(searchTerm));
    };
    if (filters.stockye) {
        filteredItems = filteredItems.filter((s) => s.stockye === filters.stockye);
    };
    const total = filteredItems.length;
    const paginatedItems = filteredItems.slice(pagination.pageIndex * pagination.itemsPerPage, (pagination.pageIndex + 1) * pagination.itemsPerPage);
    return {
        data: paginatedItems,
        total: total
    };
};
const searchItemById = (id) => {
    console.log(itemList, id);
    return itemList.find((s) => s.id === id);
};
const createItem = async (item) => {
    itemList.push({...item, id: getNewId() });
    localStorage.setItem("itemList", JSON.stringify(itemList));
};

const updateItem = async (item) => {
    itemList = itemList.map((s) => { 
    if (s.id === itemList.id) {return itemList;} return s;});
    localStorage.setItem("itemList", JSON.stringify(itemList));
};

const deleteItem = (id) => {
    itemList = itemList.filter((s) => s.id!== id);
    localStorage.setItem("itemList", JSON.stringify(itemList));
};
export const itemService = {
    searchItem,
    searchItemById,
    createItem,
    updateItem,
    deleteItem,
};