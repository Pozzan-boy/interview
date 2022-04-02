const CommentItem = ({comments, productId, date, description, onRemove}) => {

    return (
        <article className="comment-item">
            <h2>Comment</h2>
            <p>{description}</p>
            <p>date: {date}</p>
            <button onClick={onRemove}>Remove</button>
        </article>
    )
}

export default CommentItem;