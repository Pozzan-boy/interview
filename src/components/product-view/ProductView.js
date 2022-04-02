import { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useInterviewService from "../../services/InterviewServices";
import CommentItem from "../comment-item/CommentItem";
import EditItemModal from "../edit-item-modal/EditItemModal";
import {v4 as uuidv4} from 'uuid'

import './productView.scss';

const ProductView = () => {

    const {productId} = useParams();
    const [product, setThisProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [modalIsOpen, setModal] = useState(false);
    const [newComment, setNewComment] = useState('');
    const {getProduct, setProduct} = useInterviewService();

    useEffect(() => {
        updateProduct();
    }, [productId])

    const updateProduct = () => {
        getProduct(productId)
            .then(data => {
                setThisProduct(data);
                setComments(data.comments);
            })
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const onRemoveComment = (id) => {
        setComments(comments.filter((item) => {
            if(item.id !== id) {
                return item;
            }
        }));
    }

    const onAddComment = () => {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;

        const comment = {
            id: uuidv4(),
            productId,
            description: newComment,
            date: dateTime
        }
        const copyComments = comments.filter(item => item);
        copyComments.push(comment);
        console.log(copyComments);
        setComments(copyComments);
    }

    const renderView = () => {
        if(product != null) {
            setProduct(productId, {...product, comments});
            return (
                <div className="product">
                    <h2 className="product__name">{product.name}</h2>
                    <img className="product__img" src={`../../${product.imageUrl}`} alt="img" />
                    <p className="product__count">Count: {product.count}</p>
                    <p className="product__width">Width: {product.size.width}</p>
                    <p className="product__height">Height: {product.size.height}</p>
                    <p className="product__weight">Weight: {product.weight}</p>
                    <button onClick={openModal}>Edit</button>
                    <Modal isOpen={modalIsOpen}>
                        <EditItemModal update={updateProduct} id={productId} onClose={closeModal} />
                    </Modal>
                    <p className="product__comments">{comments.map(item => <CommentItem key={item.id} description={item.description} date={item.date} productId={item.productId} id={item.id} onRemove={() => onRemoveComment(item.id)} />)}</p>
                    <input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button onClick={onAddComment} >Add Comment</button>
                    <Link to="/">Go back</Link>
                </div>
            )
        }
        return (<h1>error</h1>)
    }

    return (
        <>
            {renderView()}
        </>
    )
}

export default ProductView;