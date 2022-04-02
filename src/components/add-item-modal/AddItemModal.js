import useInterviewService from '../../services/InterviewServices';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { productsFetched, productsFetchingError } from '../../actions/interviewActions';

import './addItemModal.scss';

const AddItemModal = ({onClose}) => {

    const {addProduct} = useInterviewService();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [name, setName] = useState('');
    const [count, setCount] = useState('');
    const [width, setWidth] = useState('');
    const [height, setheight] = useState('');
    const [weight, setWeight] = useState('');

    const validForm = () => {
        return (name === ''
           || count === ''
           || width === ''
           || height === ''
           || weight === '');
    }

    const onAdd = (e) => {
        e.preventDefault();
        if(validForm()) {
            return;
        }
        const newProduct = {
            id: uuidv4(),
            name,
            count,
            size: {
                width,
                height
            },
            weight,
            comments: [],
            imageUrl: "./product.jpg"
        }
        const copyProducts = products.filter(item => item);
        copyProducts.push(newProduct);
        addProduct(newProduct)
            .then(dispatch(productsFetched(copyProducts)))
            .catch(() => dispatch(productsFetchingError));
        onClose();
    }

    return (
        <form onSubmit={(e) => onAdd(e)}>
            <label htmlFor="name">Name: </label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="count">Count: </label>
            <input id="count" value={count} onChange={(e) => setCount(e.target.value)} />
            <label htmlFor="width">Width: </label>
            <input id="width" value={width} onChange={(e) => setWidth(e.target.value)} />
            <label htmlFor="height">Height: </label>
            <input id="height" value={height} onChange={(e) => setheight(e.target.value)} />
            <label htmlFor="weight">Weight: </label>
            <input id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <button type="submit">Add</button>
            <button onClick={onClose}>Cansel</button>
        </form>
    )
}

export default AddItemModal;