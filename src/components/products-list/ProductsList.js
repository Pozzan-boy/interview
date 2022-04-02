import useInterviewService from '../../services/InterviewServices';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { productsFetching, productsFetched, productsFetchingError } from '../../actions/interviewActions';
import ListItem from '../list-item/ListItem';

import './productsList.scss';
import Modal from 'react-modal/lib/components/Modal';
import AddItemModal from '../add-item-modal/AddItemModal';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const {getProducts} = useInterviewService();
    const dispatch = useDispatch();
    const {products} = useSelector(state => state);
    const [modalAddIsOpen, setModalAdd] = useState(false);

    useEffect(() => {
        dispatch(productsFetching());
        getProducts()
            .then(data => dispatch(productsFetched(data)))
            .catch(() => dispatch(productsFetchingError()));
    }, [])

    const productsItems = products.map((item) => {
        return (
            <ListItem key={item.id} {...item}/>
        )
    });

    const openModalAdd = () => {
        setModalAdd(true);
    }

    const closeModalAdd = () => {
        setModalAdd(false);
    }

    return ( 
        <section className="products-list"> 
            <h1 style={{textAlign: 'center', marginTop:'50px'}}>Products List</h1>
            <button onClick={openModalAdd} className="products-list__add-btn">AddItem</button>
            <div className="products-list__wrapper">
                {productsItems}
            </div>
            <Modal
                isOpen={modalAddIsOpen}>
                <AddItemModal onClose={closeModalAdd} />
            </Modal>
        </section>
    )

}

export default ProductsList;