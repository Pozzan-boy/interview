import { useHttp } from "../hooks/http.hook";

const useInterviewService = () => {
    const request = useHttp();

    const getProducts = async () => {
        const res = await request(`http://localhost:3001/products`);
        return res;
    }

    const getProduct = async (id) => {
        const res = await request(`http://localhost:3001/products/${id}`);
        return res;
    }

    const addProduct = async (product) => {
        const res = await request('http://localhost:3001/products', 'POST', JSON.stringify(product));
        return res;
    }

    const removeProduct = async (id) => {
        const res = await request(`http://localhost:3001/products/${id}`, 'DELETE');
        return res;
    }

    const setProduct = async (id, product) => {
        const res = await request(`http://localhost:3001/products/${id}`, 'PATCH', JSON.stringify(product));
        return res;
    }

    return {getProduct, getProducts, addProduct, removeProduct, setProduct};
}

export default useInterviewService;