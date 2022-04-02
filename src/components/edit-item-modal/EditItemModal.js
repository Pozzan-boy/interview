import useInterviewService from '../../services/InterviewServices';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsFetched, productsFetchingError } from '../../actions/interviewActions';


const EditItemModal = ({id, onClose, update}) => {

    const {setProduct} = useInterviewService();
    const {products} = useSelector(state => state);
    const dispatch = useDispatch();
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

    const onEdit = (e) => {
        e.preventDefault();
        if(validForm()) {
            return;
        }
        const newProduct = {
            id,
            name,
            count,
            size: {
                width,
                height
            },
            weight,
            imageUrl: "./product.jpg"
        }
        dispatch(productsFetched(products.filter(item => {
            if(item.id !== id) {
                return item;
            }
            return newProduct;
        })))
        setProduct(id, newProduct);
        update();
        onClose();
    }

    return (
        <form onSubmit={(e) => onEdit(e)}>
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
            <button type="submit">Edit</button>
            <button onClick={onClose}>Cansel</button>
        </form>
    )
}

export default EditItemModal;