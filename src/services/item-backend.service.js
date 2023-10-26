import { getAuth } from "firebase/auth";
const getAuthorizationHeader = async () => {
    const auth = getAuth();
    const token = await auth.currentUser?.getIdToken();
    console.log(token);
    return {
        authorization: `Bearer ${token}`,
    };
};
const searchItem = async (filters, pagination) => {
    let url = '/api/items?';
    url += `searchTerm=${encodeURIComponent(filters.searchTerm)}`;
    url += `&stockye=${encodeURIComponent(filters.stockye)}`;
    url += `&pageIndex=${encodeURIComponent(filters.pageIndex)}`;
    url += `&itemsPerPage=${encodeURIComponent(pagination.itemsPerPage)}`;
    const response = await fetch(url, {
        headers: {
            ...(await getAuthorizationHeader()),
        },
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
};

const searchItemById = async (id) => {
    const response = await fetch(`/api/items/${id}`, {
        headers: {
            ...(await getAuthorizationHeader()),
        },
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
};

const createItem = async (item) => {
    const url = `/api/items`;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            ...(await getAuthorizationHeader()),
        },
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
};

const updateItem = async (item) => {
    const url = `/api/items/${item.id}`;
    const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
            ...(await getAuthorizationHeader()),
        },
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
};

const deleteItem = async (id) => {
    const url = `/api/items/${id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            ...(await getAuthorizationHeader()),
        },
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
};
export const itemBackendService = {
    searchItem,
    searchItemById,
    createItem,
    updateItem,
    deleteItem,
};