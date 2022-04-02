import useInterviewService from '../../services/InterviewServices';
import { useSelector, useDispatch } from 'react-redux';
import { productsFetched, productsFetchingError } from '../../actions/interviewActions';

import './listItem.scss';
import Modal from 'react-modal/lib/components/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({id, imageUrl, name, count, size, weight}) => {

    const {removeProduct} = useInterviewService();
    const {products} = useSelector(state => state);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const onRemove = () => {
        const newProducts = products.filter(item => {
            if(item.id !== id) {
                return item;
            }
        })

        removeProduct(id)
            .then(dispatch(productsFetched(newProducts)))
            .catch(dispatch(productsFetchingError()));
    }

    const openDelModal = () => {
        setModalIsOpen(true);
    }

    const closeDelModal = () => {
        setModalIsOpen(false);
    }

    return (
        <article className="list-item">
            <img src={imageUrl} alt="img" className="list-item__img" />
            <Link to={`/products/${id}`}><h2 className="list-item__name">Name: {name}</h2></Link>
            <p className="list-item__count">count: {count}</p>
            <p className="list-item__size">size: width: {size.width}; height: {size.height}</p>
            weight: {weight}
            <button className="list-item__button" onClick={openDelModal}>Remove</button>
            <Modal 
                isOpen={modalIsOpen}
            >
                <button onClick={onRemove}>delete</button>
                <button onClick={closeDelModal}>cancel</button>
            </Modal>
        </article>
    )
}

export default ListItem;